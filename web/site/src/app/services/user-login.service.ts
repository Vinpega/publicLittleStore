import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./core/configuration.service";
import { Login } from "src/app/models/core/login.model";

@Injectable({providedIn:'root'})
export class UserLoginService{
    endPoint="api/login";

    constructor(private http:HttpClient, private config:ConfigurationService){
        this.endPoint = `${this.config.get().baseUrlApi}/${this.endPoint}`;
    }

    authenticate(data:Login){
        return this.http.post(this.endPoint,data);
    }
}
