import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'catalogos/articulos'},
  {path: '', component: LayoutComponent, children:[{path: 'log-in', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}]},
  {path: '', canActivate:[AuthGuard], component: LayoutComponent, children:[{path: 'catalogos',loadChildren: ()=> import('./features/catalogos/catalogos.module').then(m=> m.CatalogosModule)}]},
  {path: '', canActivate:[AuthGuard], component: LayoutComponent, children:[{path: 'movimientos',loadChildren: ()=> import('./features/movimientos/movimientos.module').then(m=> m.MovimientosModule)}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
