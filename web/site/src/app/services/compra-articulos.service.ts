import { Injectable } from "@angular/core";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";
import { CompraArticulo } from "../models/common/compra-articulo.model";

@Injectable({
  providedIn: 'root'
})
export class CompraArticulosService extends BaseApiService<CompraArticulo>
{
  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
){
  super(httpClient,'api/compra-articulos',authenticationService,configurationService,true);
}
}
