import { Component } from '@angular/core';
import { CompraArticulo } from 'src/app/models/common/compra-articulo.model';
import { Compra } from 'src/app/models/common/compra.model';
import { CompraArticulosService } from 'src/app/services/compra-articulos.service';
import { ComprasService } from 'src/app/services/compras.service';
import { CarritoService } from '../carrito.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Articulo } from 'src/app/models/common/articulo.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  compras: Compra[]=[];
  comprasArticulos: CompraArticulo[]=[];
  articulos:Articulo[] = [];

  constructor(
    public carritoService: CarritoService,
    private compraService: ComprasService,
    private compraArticuloService: CompraArticulosService,
    private articulosService: ArticulosService
  ) {

  }

  ngOnInit(): void {
    this.articulosService.getAll().subscribe(values => this.articulos =values);
    this.buscar();
  }

  obtenerArticulo(codigo: string) {
    const art =  this.articulos.find(x => x.codigo === codigo);
    console.log(art);
    return art;
  }

  eliminarItem(compraArticulo: CompraArticulo, codigo: string){
    const articulo =  this.articulos.find(x => x.codigo === codigo)!;
    articulo.stock +=1;
    this.articulosService.update(articulo.codigo!, articulo).subscribe();
    this.carritoService.quitarArticulo(compraArticulo, articulo);
  }

  pagar(){
    this.carritoService.pagarCarrito();
  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito().subscribe(sucess=> {
      if(sucess){
        this.buscar();
      }
    });
  }

  obtenerDetalle(idCompra: number){
    return this.comprasArticulos.filter(reg=> reg.idCompra === idCompra);
  }

  private buscar(){
    this.compraService.getAll().subscribe(values => {
      this.compras  = values;
    });
    this.compraArticuloService.getAll().subscribe(values => {
      this.comprasArticulos = values;
    });
  }
}
