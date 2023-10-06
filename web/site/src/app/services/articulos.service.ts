import { Injectable } from "@angular/core";
import { Articulo } from "../models/common/articulo.model";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class ArticulosService extends BaseApiService<Articulo>
{
  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
){
  super(httpClient,'api/articulos',authenticationService,configurationService,true);
}
}
