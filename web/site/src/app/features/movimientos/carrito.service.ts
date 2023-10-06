import { Observable, publishReplay, share, tap } from 'rxjs';
import { Cliente } from './../../models/common/cliente.model';
import { ClientesService } from './../../services/clientes.service';
import { AuthenticationService } from './../../services/core/authentication.service';
import { Injectable, createPlatform } from '@angular/core';
import { Articulo } from 'src/app/models/common/articulo.model';
import { CompraArticulo } from 'src/app/models/common/compra-articulo.model';
import { Compra } from 'src/app/models/common/compra.model';
import { CompraArticulosService } from 'src/app/services/compra-articulos.service';
import { ComprasService } from 'src/app/services/compras.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito?: Compra = undefined;
  items:CompraArticulo[] = [];
  maxId: number =0;
  maxItemId: number = 0;

  private cliente?: Cliente;

  constructor(private compraService: ComprasService,
    private compraArticulosService: CompraArticulosService,
    private authenticationService: AuthenticationService,
    private clientesService: ClientesService) {
      this.authenticationService.authenticationStateChange$.subscribe(state=> {
        this.buscar();
      });
    }

  private buscar(){

    this.clientesService.get(this.authenticationService.getAuthenticationState().user?.id?.toString()!)
    .subscribe(cliente => {
      this.cliente = cliente;
    });

    this.compraService.getAll().subscribe(values =>{

      this.maxId =  values.reduce((max, compra) => (compra.id > max ? compra.id : max), 0);
      this.carrito = values.find(compra => !compra.pagada);


      //Nested
      this.compraArticulosService.getAll().subscribe(values =>{
        this.maxItemId = values.reduce((max, item) => (item.id > max ? item.id : max), 0);

        if(this.carrito){
          this.carrito.idCliente = this.cliente?.id as number;
          this.carrito.idClienteNavigation = this.cliente;
          this.items = values.filter(item=> item.idCompra === this.carrito?.id);
        }
        else{
          this.items = [];
        }
      });
    });
  }

  agregarArticulo(articulo: Articulo) {

    if(!this.carrito){
      this.carrito = {
        id: this.maxId + 1,
        fecha: new Date().toISOString().slice(0, 10),
        idCliente: this.cliente?.id as number,
        total: 0,
        pagada: false,
        idClienteNavigation: this.cliente
      }

      this.compraService.create(this.carrito).subscribe((succed) => {
        if(succed) this.agregarArticulo(articulo);
      });
      return;
    }

      const found = this.items.find(x => x.codigoArticulo === articulo.codigo);
      if(found){

        found.cantidad +=1;
        found.idCompraNavigation = this.carrito;
        found.codigoArticuloNavigation = articulo;
        this.compraArticulosService.update(found.id.toString(), found).subscribe();
      }
      else{
        this.compraArticulosService.create({
          id: this.maxItemId +1,
          idCompra: this.carrito.id,
          codigoArticulo: articulo.codigo ?? "",
          cantidad: 1,
          idCompraNavigation: this.carrito,
          codigoArticuloNavigation: articulo
        }).subscribe();

      }

      this.carrito.total += articulo.precio;

      this.compraService.update(this.carrito.id.toString(), this.carrito).subscribe(success => {if(success) this.buscar();});
  }

  quitarArticulo(compraArticulo: CompraArticulo, articulo: Articulo){
    if(this.carrito){
      const found = this.items.find(x => x.id === compraArticulo.id);
      if(found){
        if(found.cantidad === 1){
          this.compraArticulosService.delete(found.id.toString()).subscribe();//success => {if(success) this.buscar();});
        }
        else {
          found.cantidad -=1;
          found.idCompraNavigation = this.carrito;
          found.codigoArticuloNavigation =articulo;
          this.compraArticulosService.update(found.id.toString(), found).subscribe();//success => {if(success) this.buscar();});
        }
      }
      this.carrito.total -= articulo.precio;
      this.compraService.update(this.carrito.id.toString(), this.carrito).subscribe(success => {if(success) this.buscar();});
    }
  }

  pagarCarrito(){
    if(this.carrito){
      this.carrito.pagada = true;
      this.compraService.update(this.carrito.id.toString(), this.carrito).subscribe(success => {if(success) this.buscar();});
    }
  }

  vaciarCarrito():Observable<boolean> {
      const delObservable= this.compraService.delete(this.carrito!.id.toString()).pipe(share(), tap(val=> console.log(val)));
      delObservable.subscribe(success => {if(success)
        this.buscar()
       });

      return delObservable;
  }
}
