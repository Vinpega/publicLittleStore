import { Injectable } from "@angular/core";
import { Articulo } from "../models/common/articulo.model";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";
import { Tienda } from "../models/common/tienda.model";

@Injectable({
  providedIn: 'root'
})
export class TiendasService extends BaseApiService<Tienda>
{
  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
){
  super(httpClient,'api/tiendas',authenticationService,configurationService,true);
}
}
