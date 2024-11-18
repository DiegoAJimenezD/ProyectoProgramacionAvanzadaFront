export interface CrearOrdenDTO {
    estadoOrden: string,
    idCliente: string,
    idCupon?: string,
    codigoPasarela?: string,
    items: any[],
    total: number
 }
 