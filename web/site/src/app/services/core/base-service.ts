import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { EnvironmentConfig } from "src/app/models/core/environment";
import { ConfigurationService } from "./configuration.service";
import { AuthenticationService } from "./authentication.service";

export abstract class BaseApiService<T> {
  protected url:string;
  protected baseUrl?: string;

  environment: EnvironmentConfig;

  constructor(
    protected httpClient: HttpClient,
    protected endpoint: string,
    private auth: AuthenticationService,
    protected configurationService: ConfigurationService,
    protected useAuth: boolean = true,
    overrideBaseUrl: string = "",
  ) {
    this.environment = this.configurationService.get();
    this.baseUrl = overrideBaseUrl?.length ? overrideBaseUrl : this.environment.baseUrlApi;
    this.url = `${this.baseUrl}/${endpoint}`;
  }

  get(id: string): Observable<T> {
    const headers = this.getAuth();
    return this.httpClient.get<T>(`${this.url}/${id}`, { headers });
  }


  getAll(): Observable<T[]> {
    const headers = this.getAuth();
    return this.httpClient.get<T[]>(`${this.baseUrl}/${this.endpoint}`,
    {
      headers,
    });
  }

  create(model: T): Observable<boolean> {
    const headers = this.getAuth();
    return this.httpClient.post<boolean>(`${this.url}`, model, { headers })
  }

  update(id: string, model: T): Observable<T> {
    const headers = this.getAuth();
    return this.httpClient.put<T>(`${this.url}/${id}`, model, { headers });
  }

  patch(id: string, model: T): Observable<T> {
    const headers = this.getAuth();
    return this.httpClient.patch<T>(`${this.url}/${id}`, model, { headers });
  }
  delete(id: string) {
    const headers = this.getAuth();

    return this.httpClient.delete<boolean>(`${this.url}/${id}`, {
      headers,
    });
  }

  deleteOne(id: string) {
    const headers = this.getAuth();
    // return this.httpClient.delete(`${this.url}/${id}`, {
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers
    });
  }


  protected getAuth(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.useAuth) {
      const token = this.auth.getAccessToken();
      headers = headers.append("Authorization", `Bearer ${token}`);
    }


    return headers;
  }
}
