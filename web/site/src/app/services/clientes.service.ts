import { Injectable } from "@angular/core";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";
import { Cliente } from "../models/common/cliente.model";

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseApiService<Cliente>
{
  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
){
  super(httpClient,'api/clientes',authenticationService,configurationService,true);
}
}
