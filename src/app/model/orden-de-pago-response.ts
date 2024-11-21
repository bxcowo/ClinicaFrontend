export interface IOrdenDePagoResponse {
    idOrdenDePago: string;
    idCita: string;
    fecha: Date;
    nombresPaciente: string;
    apellidosPaciente: string;
    dniPaciente: number;
    comprobanteDePago: string;
    metodoDePago: string;
    monto: number;
    estado: string;
}
