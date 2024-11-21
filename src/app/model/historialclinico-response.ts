import { IPaciente } from "./paciente";

export interface IHistorialclinicoResponse {
    idHistorialClinico:string; 
    paciente:IPaciente; 
    fecha:Date; 
    observaciones:string; 
    diagnosticos:string;  

}
