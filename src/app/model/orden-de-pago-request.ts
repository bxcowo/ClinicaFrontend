export interface IOrdenDePagoRequest {
    idOrdenDePago: string | null;
    idCita: string;
    idComprobanteDePago: number | null;
    idMetodoDePago: number | null;
    fecha: Date;
    monto: number | null;
    estado: string | null;
}
