import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { delay, finalize, tap } from 'rxjs/operators';
import { EmpleadoI, PuestoI, ResEmpleadoI, SucursalI } from 'src/app/interfaces/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

let tableList: EmpleadoI[] = []


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  dataSource = new MatTableDataSource<EmpleadoI>(tableList);
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'sexo','puesto', 'opciones'];
  
  listaSucursales: SucursalI[] = [];
  listaPuestos: PuestoI[]=[
    {
      id: 1,
      puesto: 'Analista'
    },
    {
      id: 2,
      puesto: 'Coordinador'
    },
    {
      id: 3,
      puesto: 'Gerente'
    },
    {
      id: 4,
      puesto: 'Contador'
    }
  ];

  sucursalesControl = new FormControl();
  perfilForm;
  inputValue='';

  isLoading:boolean = false;

  isEditEmpleado:boolean=false;
  isRemove:boolean=false;
  idEmpleadoEdit!: number;
  constructor(
    private serviceSucursales:  SucursalService,
    private _snackBar:          MatSnackBar,
    private _formBuilder:       FormBuilder
  ){
    this.perfilForm = _formBuilder.group({
      nombre:   ['',[Validators.required]],
      edad:     ['',[Validators.required,Validators.min(1), Validators.max(100)]],
      puesto:   ['',[Validators.required]],
      sexo:     ['',[Validators.required]],
      sucursal: [,[Validators.required]],
    });

  }

  ngOnInit() {
    this.getSucursales()
  }

  getSucursales(){
    this.serviceSucursales.findAllSucursales().subscribe(data=>{
      this.listaSucursales = data
      console.log(this.listaSucursales)
    })
  }

  searchEmpleados(_id:number){
    if(!_id) return
    this.isLoading=true
    this.serviceSucursales.findEmpleadoByIdSucursal(_id).pipe(
      delay(450),
      finalize(()=>this.isLoading=false),
    ).subscribe(data=>{
      tableList = data
      this.dataSource = new MatTableDataSource(tableList);
      this.dataSource.data = tableList;
    },err =>{
      tableList = []
      this.dataSource.data.length
      this.dataSource = new MatTableDataSource(tableList);
    })
  }

  save() {
    var perfilForm = this.perfilForm.value
    var _sucursal:any = this.perfilForm.controls['sucursal'].value
    const ADD_EMPLEADO ={
      edad:       perfilForm.edad,
      nombre:     perfilForm.nombre,
      sexo:       perfilForm.sexo,
      puesto:     perfilForm.puesto,
      idSucursal: _sucursal?.id,
    }
    const EDIT_EMPLEADO = {
      ...ADD_EMPLEADO,
      id: this.idEmpleadoEdit
    }
    if(this.isEditEmpleado){
      this.serviceSucursales.editEmpleadoByIdSucursal(EDIT_EMPLEADO).subscribe(async data=>{
        this.cancel()
        this.searchEmpleados(EDIT_EMPLEADO.idSucursal)
        this._snackBar.open('Empleado actualizado','ok',{duration:950})
      })
    }else{
      this.serviceSucursales.addEmpleadoByIdSucursal(ADD_EMPLEADO).subscribe(async data=>{
        this.cancel()
        this.searchEmpleados(EDIT_EMPLEADO.idSucursal)
        this._snackBar.open('Nuevo empleado','ok',{duration:950})
      })
    }
  }

  cancel(){
    this.perfilForm.reset()
    this.isEditEmpleado=false;
    this.idEmpleadoEdit=0
  }

  remover(element:EmpleadoI){
    if(!element.id) return
    this.cancel();
    this.isRemove = true
    const ID = element.id || 0
    this.serviceSucursales.deleteEmpleadoByIdSucursal(ID).pipe(
      finalize(()=>this.isRemove=false)
    ).subscribe(()=>{
      tableList.map((el, index)=>{
        if(el.id == ID) tableList = tableList.slice(index-1,1)
      })
      this.dataSource = new MatTableDataSource(tableList);
    })
  }

  async edit(element:ResEmpleadoI){
    let _sucursalSelect;
    console.log(element.sexo)
    await this.listaSucursales.map(suc => {
      if (suc.id == element.idSucursal) _sucursalSelect = suc;
    })
    this.perfilForm.controls['edad'].setValue(element.edad.toString())
    this.perfilForm.controls['nombre'].setValue(element.nombre)
    this.perfilForm.controls['puesto'].setValue(element.puesto)
    this.perfilForm.controls['sexo'].setValue(element.sexo)
    this.perfilForm.controls['sucursal'].setValue(_sucursalSelect)
    this.isEditEmpleado = true;
    this.idEmpleadoEdit=element.id
  }
}
