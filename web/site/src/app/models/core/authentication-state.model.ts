import { Cliente } from "../common/cliente.model";

export class AuthenticationState {
  user?: Cliente;
  isReady: boolean;
  isAuthenticated: boolean;
  tokenExpire?: Date;

  constructor() {
    this.isReady = false;
    this.isAuthenticated = false;
  }
}
