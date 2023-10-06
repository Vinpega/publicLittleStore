import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  { path: 'inventario', component: InventarioComponent },
  { path: 'carrito', component: CarritoComponent },
];


@NgModule({
  declarations: [
    CarritoComponent,
    InventarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MovimientosModule { }
