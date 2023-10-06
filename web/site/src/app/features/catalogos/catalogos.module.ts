import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TiendasComponent } from './tiendas/tiendas.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: 'articulos', component: ArticulosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: '/articulos', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ArticulosComponent,
    TiendasComponent,
    ClientesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogosModule { }
