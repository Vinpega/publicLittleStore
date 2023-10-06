import { Articulo } from "./articulo.model";
import { Compra } from "./compra.model";

export interface CompraArticulo {
    id: number;
    idCompra: number;
    codigoArticulo: string;
    cantidad: number;
    codigoArticuloNavigation: Articulo;
    idCompraNavigation: Compra;
}
