export interface ICitaResponse {
    idCita:string;
    dniPaciente:number;
    nombresPaciente:string;
    apellidosPaciente:string;
    nombresMedico:string;
    apellidosMedico:string; 
    nombreConsultorio:string;
    fecha:Date;             
    horaInicio:string;        
    horaFin:string;           
    estado:string;          
}
