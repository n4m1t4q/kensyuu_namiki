import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  public async get<Req, Res>(apiPath: string, request?: Req): Promise<HttpResponse<Res>> {
    return await this.send<Req, Res>('GET', apiPath, request);
  }

  public async post<Req, Res>(apiPath: string, request?: Req): Promise<HttpResponse<Res>> {
    return await this.send<Req, Res>('POST', apiPath, request);
  }

  public async put<Req, Res>(apiPath: string, request?: Req): Promise<HttpResponse<Res>> {
    return await this.send<Req, Res>('PUT', apiPath, request);
  }

  public async delete<Req, Res>(apiPath: string, request?: Req): Promise<HttpResponse<Res>> {
    return await this.send<Req, Res>('DELETE', apiPath, request);
  }

  /** HTTP通信 実行 */
  private async send<Req, Res>(method: 'GET'|'POST'|'PUT'|'DELETE', path: string, request?: Req): Promise<HttpResponse<Res>> {
    try {
      const url = window.location.origin + path;
      console.log('[HttpService - url] ', url);

      // GET, PUT の場合 クエリパラメータ生成 (exppress の query にセットされる)
      let httpParams: HttpParams = new HttpParams();
      if ((method === 'GET' || method === 'DELETE') && request) {
        for (const requestKey of Object.keys(request)) {
          if (request[requestKey]) {
            httpParams = httpParams.append(requestKey, request[requestKey]);
          }
        }
      }

      const response = await this.http.request<Res>(method, url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
        params: httpParams,
        body: request
      }).toPromise();
      console.log('[HttpService - response] ', response);

      return { ok: true, status: 200, body: response } as HttpResponse<Res>;
    } catch (error) {
      console.log('[HttpService - error] ', error);

      if (error instanceof HttpErrorResponse) {
        return { ok: false, status: error.status, body: undefined } as HttpResponse<Res>;
      } else {
        return { ok: false, body: undefined } as HttpResponse<Res>;
      }
    }

  }

}
