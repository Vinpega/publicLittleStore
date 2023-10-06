import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Declaración de variables para almacenar nombre de usuario y contraseña
  username: string = '';
  password: string = '';
  status: 'waiting'|'invalid'='waiting';

  constructor(
    public auth:AuthenticationService,
    private router: Router){

    this.auth.authenticationStateChange$.subscribe(res=>{
      if(res.isAuthenticated)
      {
        this.redirect();
      }
      else
      {
        this.status='invalid';
      }
    });
    this.status = 'waiting';
  }

  onSubmit(): void {
    this.status = 'invalid';
    this.auth.login(this.username, this.password);
  }

  redirect() {
    this.router.navigateByUrl('catalogos/articulos');
  }
}
