export {
    SucursalI,
    PuestoI,
    EmpleadoI,
    ResEmpleadoI
}
interface SucursalI {
    id:         number,
    sucursal:   string
}

interface PuestoI {
    id:     number,
    puesto: string
}

interface EmpleadoI{
    id:        number,
    nombre:     string,
    edad:       number,
    puesto:     string,
    sexo:       string,
    sucursal:   string,
}

interface ResEmpleadoI extends EmpleadoI {
    idSucursal: number
}
