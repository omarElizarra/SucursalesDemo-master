import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppsettingsComponent } from '../settings/setting.component';
import { catchError, map, throwError } from 'rxjs';
import { EmpleadoI, ResEmpleadoI, SucursalI } from '../interfaces/sucursal';

//let _headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

//let _headers = new HttpHeaders().set('contentType', 'application/x-www-form-urlencoded;');
let _headers =
{
  "Access-Control-Allow-Headers" : "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  constructor(
  private http:  HttpClient,
  private appsettings: AppsettingsComponent,
  ) { }
  
/**
 * findAllSucursal
 *  - buscar sucursal por id
 * @return sucursales[]
 * @param id
 * @autor OmarElizarra
 */
  findAllSucursales(){
    const DIR = this.appsettings.API_ENDPOINT + `sucursales/Sucursal`
    return this.http.get<SucursalI[]>(DIR,{withCredentials:false,headers: _headers}).pipe(
      map(res=>res),
      catchError( err =>{
        return throwError(()=> new Error(err))
      })
    )
  }

  /**
 * findEmpleadoByIdSucursal
 *  - buscar empleados por sucursal
 * @return empleados[]
 * @param id
 * @autor OmarElizarra
 */
  findEmpleadoByIdSucursal(id:number){
    const DIR = this.appsettings.API_ENDPOINT + `Empleado/FindByIdSucursal/${id}`
    return this.http.get<EmpleadoI[]>(DIR,{headers: _headers}).pipe(
      map(data=>data),
      catchError( err =>{
        return throwError(()=> new Error(err))
      })
    )
  }

  
/**
 * deleteEmpleadoByIdSucursal
 *  - buscar empleados por sucursal
 * @return empleados[]
 * @param id
 * @autor OmarElizarra
 */
    deleteEmpleadoByIdSucursal(id:number){
      const DIR = this.appsettings.API_ENDPOINT + `Empleado/${id}`
      return this.http.delete(DIR).pipe(
        map(data=>data),
        catchError( err =>{
          return throwError(()=> new Error(err))
        })
      )
    }

    
/**
 * addEmpleadoByIdSucursal
 *  - agregar empleados por sucursal
 * @return empleados[]
 * @param id
 * @autor OmarElizarra
 */
addEmpleadoByIdSucursal(empleado:any){
  const DIR = this.appsettings.API_ENDPOINT + `Empleado`
  return this.http.post<ResEmpleadoI>(DIR,empleado).pipe(
    map(data=>data),
    catchError( err =>{
      return throwError(()=> new Error(err))
    })
  )
}

/**
 * editEmpleadoByIdSucursal
 *  - Actualizar empleado
 * @return empleados[]
 * @param id
 * @autor OmarElizarra
 */
editEmpleadoByIdSucursal(empleado:any){
  const DIR = this.appsettings.API_ENDPOINT + `Empleado/${empleado.id}`
  return this.http.put<ResEmpleadoI>(DIR,empleado,{headers: _headers}).pipe(
    map(data=>data),
    catchError( err =>{
      return throwError(()=> new Error(err))
    })
  )
}

}
