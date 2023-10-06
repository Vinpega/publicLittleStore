import { Component } from '@angular/core';
import { Tienda } from 'src/app/models/common/tienda.model';
import { TiendasService } from 'src/app/services/tiendas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent {
  readonlyMode=true;
  tiendas: Tienda[] = [];
  tiendaSeleccionada: Tienda | null = null;

  constructor(
    private tiendasService: TiendasService){
  }

  ngOnInit(): void {
    this.buscar();
  }

  agregarTienda() {
    this.tiendaSeleccionada = { sucursal: '', direccion: '' };
    this.readonlyMode = false;
  }

  editarTienda(tienda: Tienda) {
    this.tiendaSeleccionada = tienda;
    this.readonlyMode = true;
  }

  guardarCambios() {
    if (this.tiendaSeleccionada) {
      const found = this.tiendas.find(x=>  this.tiendaSeleccionada?.sucursal === x.sucursal);

      if(found){
        this.tiendasService.update(this.tiendaSeleccionada.sucursal, this.tiendaSeleccionada).subscribe(succed=>  {
          if(succed){
            this.limpiar()
            this.buscar()
          }
        });;
      }
      else{
        this.tiendasService.create(this.tiendaSeleccionada).subscribe(succed=>  {
          if(succed){
            this.limpiar()
            this.buscar()
          }
        });;
      }

    }
  }

  cancelarEdicion() {
  }

  eliminarTienda(tienda: Tienda) {
    this.tiendasService.delete(tienda.sucursal).subscribe(succed=>  {
      if(succed){
        this.limpiar()
        this.buscar()
      }
    });;
  }

  private buscar(){
    this.tiendasService.getAll().subscribe(values => {
      this.tiendas  = values;
    });
  }

  private limpiar(){
    // Limpiar la selección y el formulario de edición
    this.tiendaSeleccionada = null;
  }

}


