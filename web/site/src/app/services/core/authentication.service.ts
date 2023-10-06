import { Injectable } from "@angular/core";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { EnvironmentConfig } from "src/app/models/core/environment";
import { ConfigurationService } from "./configuration.service";
import { Login } from "src/app/models/core/login.model";
import { AuthenticationState } from "src/app/models/core/authentication-state.model";
import { Cliente } from "src/app/models/common/cliente.model";
import { UserLoginService } from "../user-login.service";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private urlLoginRedirect?:string;
  private urlLogoutRedirect?:string;
  private allowRecover?:boolean;
  private allowRegister?:boolean;

  private authenticationState: AuthenticationState = new AuthenticationState();
  private authenticationStateSubject = new BehaviorSubject<AuthenticationState>(this.authenticationState);

  authenticationStateChange$ = this.authenticationStateSubject.asObservable();



  get UrlLoginRedirect(){
    return this.urlLoginRedirect;
  }
  get AllowRecover(){
      return this.allowRecover;
  }
  get AllowRegister(){
      return this.allowRegister;
  }

  constructor(
    private loginService: UserLoginService
    ) {
  }

  init() {
    this.onInit();
  }
  onInit(urlLoginRedirect:string='catalagos/articulos', urlLogoutRedirect:string='',
    allowRecover:boolean=true, allowRegister:boolean=true){

    this.urlLoginRedirect = urlLoginRedirect;
    this.urlLogoutRedirect = urlLogoutRedirect;
    this.allowRecover=allowRecover;
    this.allowRegister=allowRegister;

    this.authenticationState = new AuthenticationState();

    if(this.isTokenExpired() && !this.authenticationState.isReady)
      this.updateAuthenticationState(this.authenticationState);
  }

  getAuthenticationState() {
    return this.authenticationState;
  }

  private updateAuthenticationState(authenticationState: AuthenticationState) {
    this.authenticationState = authenticationState;
    this.authenticationState.isReady = true;
    this.authenticationStateSubject.next(this.authenticationState);
  }

  private loadTokenInfo(tokenInfo: any) {
    this.authenticationState.user = {
      id: tokenInfo.sub,
      nombre: tokenInfo.name,
      apellidos:"",
      clave: "",
      direccion:""
    }
    this.authenticationState.tokenExpire = new Date(tokenInfo.exp * 1000);
    this.authenticationState.isAuthenticated = true;
    this.updateAuthenticationState(this.authenticationState);
  }

  login(user: string, password: string) {
    this.authenticationState.isReady = false;

    if (user != null && password != null) {

      const loginInformation:Login = new Login();
      loginInformation.logUser = user;
      loginInformation.logPassword = password;

      this.authenticationState = new AuthenticationState();
      this.loginService.authenticate(loginInformation)
      .subscribe((res: any) => {
          localStorage.setItem("jwt", res.token);

          const tokenInfo: any = jwtDecode(res.token);
          this.loadTokenInfo(tokenInfo);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem("jwt");
    this.updateAuthenticationState(new AuthenticationState());
  }

  getAccessToken() {
    return localStorage.getItem("jwt");
  }

  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return true;
    }

    const tokenInfo: JwtPayload = jwtDecode(token);
    const expired = Math.floor(new Date().getTime() / 1000) >= (tokenInfo.exp ?? 0);

    if (expired) {
      this.logout();
    }
    else {
      if (this.authenticationState.isAuthenticated == false){
        this.loadTokenInfo(tokenInfo);
      }
    }

    return expired;
  }

  public getLogoutUrl() {
    return this.urlLogoutRedirect;
  }

}


