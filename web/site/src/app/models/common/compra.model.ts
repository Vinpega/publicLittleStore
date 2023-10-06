import { Cliente } from "./cliente.model";

export interface Compra {
    id: number;
    idCliente: number;
    total: number;
    fecha: string;
    pagada: boolean;
    idClienteNavigation?:Cliente;
}
