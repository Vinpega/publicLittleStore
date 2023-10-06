import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/core/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  continue: boolean =false;
  constructor(private authService: AuthenticationService,
    private _router: Router){

    this.authService.authenticationStateChange$.subscribe(res=>{
      this.continue = res.isAuthenticated;
    });

    this.authService.isAuthenticated();

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.continue){
        this._router.navigateByUrl('log-in');
      }
    return this.continue;
  }
}
