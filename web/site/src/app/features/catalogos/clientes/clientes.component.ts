import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/common/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  clienteSeleccionado?: Cliente;

  constructor(private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.buscar();
  }

  agregarCliente() {
    const maxId = this.clientes.reduce((max, cliente) => (cliente.id! > max ? cliente.id! : max), 0);

    this.clienteSeleccionado = {id: maxId +1, clave:"", nombre:"", apellidos:"", direccion:""}
  }

  editarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  guardarCambios() {
    if(this.clienteSeleccionado){
      const found = this.clientes.find(x=>  this.clienteSeleccionado?.id === x.id);

      if(found && this.clienteSeleccionado.id) {
        this.clientesService.update(this.clienteSeleccionado.id.toString() , this.clienteSeleccionado).subscribe(succed=>{
          if(succed){
            this.limpiar()
            this.buscar()
          }
        } );;
      }
      else{
        this.clientesService.create(this.clienteSeleccionado).subscribe(succed=>{
          if(succed){
            this.limpiar()
            this.buscar()
          }
        } );;
      }

      this.limpiar();

    }
  }

  cancelarEdicion() {
    this.limpiar();
  }

  eliminarCliente(cliente: Cliente) {
    this.clientesService.delete(cliente.id?.toString() as string).subscribe(succed=>{
      if(succed){
        this.limpiar()
        this.buscar()
      }
    } );
  }

  private buscar(){
    this.clientesService.getAll().subscribe(values => {
      this.clientes  = values;
    });
  }

  private limpiar(){
    this.clienteSeleccionado = undefined;
  }
}
