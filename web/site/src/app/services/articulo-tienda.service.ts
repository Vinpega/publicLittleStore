import { Injectable } from "@angular/core";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";
import { ArticuloTienda } from "../models/common/articulo-tienda.model";

@Injectable({
  providedIn: 'root'
})
export class ArticuloTiendasService extends BaseApiService<ArticuloTienda>
{
  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
){
  super(httpClient,'api/articulo-tiendas',authenticationService,configurationService,true);
}
}
