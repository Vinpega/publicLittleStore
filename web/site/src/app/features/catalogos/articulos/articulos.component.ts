import { Component } from '@angular/core';
import { Articulo } from 'src/app/models/common/articulo.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CarritoService } from '../../movimientos/carrito.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent {
  readonlyMode=true;
  articulos: Articulo[] = [];
  articuloSeleccionado?: Articulo;

  constructor(private articuloService: ArticulosService,
    public carritoService: CarritoService,) {}

  ngOnInit(): void {
    this.buscar();
  }

  agregarNuevo(): void {
    this.articuloSeleccionado = { codigo:"", descripcion:"", precio:0, stock:0, imagen:""}
    this.readonlyMode = false;
  }

  editarArticulo(articulo: Articulo): void {
    // Habilitar la edición y establecer el artículo seleccionado
    this.articuloSeleccionado = { ...articulo };
    this.readonlyMode = true;
  }

  agregarAlCarrito(articulo: Articulo){
    articulo.stock -=1;
    this.carritoService.agregarArticulo(articulo);

    this.update(articulo);
  }

  guardarCambios(): void {

    if(this.articuloSeleccionado){
      const found = this.articulos.find(x=>  this.articuloSeleccionado?.codigo === x.codigo);

      if (found) {
        this.update(this.articuloSeleccionado);
      }
      else {
        this.articuloService.create(this.articuloSeleccionado).subscribe(succed=>{
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

  eliminarArticulo(codigo: string): void {
    this.articuloService.delete(codigo).subscribe(succed =>  {
      if(succed){
        this.limpiar()
        this.buscar()
      }
    });
  }

  private update(articulo: Articulo){
    this.articuloService.update(articulo.codigo as string, articulo!).subscribe(succed=>  {
      if(succed){
        this.limpiar()
        this.buscar()
      }
    });
  }

  private buscar(){
    // Obtener todos los artículos al cargar el componente
    this.articuloService.getAll().subscribe(values => {
      this.articulos  = values;
    });
  }

  private limpiar(){
    // Limpiar la selección y el formulario de edición
    this.articuloSeleccionado = undefined;
  }
}
