import { TiendasService } from './../../../services/tiendas.service';
import { ArticulosService } from './../../../services/articulos.service';
import { Component } from '@angular/core';
import { ArticuloTienda } from 'src/app/models/common/articulo-tienda.model';
import { Articulo } from 'src/app/models/common/articulo.model';
import { Tienda } from 'src/app/models/common/tienda.model';
import { ArticuloTiendasService } from 'src/app/services/articulo-tienda.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  registros: ArticuloTienda[] = [];
  registroSeleccionado?: ArticuloTienda;
  tiendas: Tienda[] = [];
  articulos: Articulo[]=[];

  constructor(private registroService: ArticuloTiendasService,
    private articulosService: ArticulosService ,
    private tiendasService: TiendasService ) {}

  ngOnInit(): void {
    this.buscar();
    this.articulosService.getAll().subscribe(values => this.articulos = values);
    this.tiendasService.getAll().subscribe(values => this.tiendas = values);
  }

  agregarNuevo(): void {

    const maxId = this.registros.reduce((max, reg) => (reg.id > max ? reg.id  : max), 0);

    this.registroSeleccionado = {id:maxId +1,  codigoArticulo:"", tiendaSucursal:"", fecha: new Date()}
  }

  dateChage(valor: any) {
      if(this.registroSeleccionado){
        this.registroSeleccionado.fecha = new Date(valor.value);
      }
  }

  editarArticulo(registro: ArticuloTienda): void {
    this.registroSeleccionado = { ...registro };
  }

  guardarCambios(): void {
    if(this.registroSeleccionado){

      this.registroSeleccionado.codigoArticuloNavigation =  this.articulos.find(x=> x.codigo === this.registroSeleccionado?.codigoArticulo);
      this.registroSeleccionado.tiendaSucursalNavigation =  this.tiendas.find(x=> x.sucursal === this.registroSeleccionado?.tiendaSucursal);

      const found = this.registros.find(x=>  this.registroSeleccionado?.id === x.id);

      if (found) {
        this.registroService.update(this.registroSeleccionado.id.toString(), this.registroSeleccionado!).subscribe(succed=>{
          if(succed){
            this.limpiar()
            this.buscar()
          }
        } );;
      }
      else {
        this.registroService.create(this.registroSeleccionado).subscribe(succed=>{
          if(succed){
            this.limpiar()
            this.buscar()
          }
        } );
      }

    }
  }

  cancelarEdicion(): void {
    this.limpiar();
  }

  eliminarArticulo(codigo: number): void {
    this.registroService.delete(codigo.toString()).subscribe(succed=>{
      if(succed){
        this.limpiar()
        this.buscar()
      }
    } );;
  }

  getArticulo(codigo: string){
    return this.articulos.find(x=> x.codigo === codigo)?.descripcion;
  }

  getTienda(sucursal: string){
    return this.tiendas.find(x=> x.sucursal === sucursal)?.direccion;
  }

  private buscar(){
    this.registroService.getAll().subscribe(values => {
      this.registros  = values.map(v=> { return {...v, fecha: new Date(v.fecha)}});
    });
  }

  private limpiar(){
    // Cancelar la edición y limpiar el formulario de edición
    this.registroSeleccionado = undefined;

  }
}
