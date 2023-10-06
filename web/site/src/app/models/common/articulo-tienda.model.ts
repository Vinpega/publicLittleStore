import { Articulo } from "./articulo.model";
import { Tienda } from "./tienda.model";

export interface ArticuloTienda {
    id: number;
    codigoArticulo: string;
    tiendaSucursal: string;
    fecha: Date;
    codigoArticuloNavigation?: Articulo;
    tiendaSucursalNavigation?: Tienda;
}
