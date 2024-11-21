export interface IOrdenDePagoRequest {
    idOrdenDePago: string;
    idCita: string;
    idComprobanteDePago: number;
    idMetodoDePago: number;
    fecha: Date;
    monto: number;
    estado: string;
}
