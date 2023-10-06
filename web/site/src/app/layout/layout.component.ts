import { Component } from '@angular/core';
import { CarritoService } from '../features/movimientos/carrito.service';
import { AuthenticationService } from '../services/core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    public carritoService: CarritoService,
    private authService: AuthenticationService,
    private _router: Router
  ){
  }

  salir(){
    this.authService.logout();
    this._router.navigateByUrl('log-in');
  }
}
