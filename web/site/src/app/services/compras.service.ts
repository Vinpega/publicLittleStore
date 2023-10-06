import { Injectable } from "@angular/core";
import { BaseApiService } from "./core/base-service";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./core/authentication.service";
import { ConfigurationService } from "./core/configuration.service";
import { Compra } from "../models/common/compra.model";
import { CompraArticulo } from "../models/common/compra-articulo.model";
import { Articulo } from "../models/common/articulo.model";

@Injectable({
  providedIn: 'root'
})
export class ComprasService extends BaseApiService<Compra>
{

  constructor(
    protected override httpClient: HttpClient,
    protected authenticationService:AuthenticationService,
    protected override configurationService :ConfigurationService
  ){
    super(httpClient,'api/compras',authenticationService,configurationService,true);
  }

}
