import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SAMPLE_API_PATH, ISampleRequest, ISampleResponse } from 'common/apis/sample/sample.api';
import { Sample } from 'common/entities/sample/sample.entity';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SampleService extends HttpService {

  constructor(protected http: HttpClient) { super(http); }

  public async testGet(request: ISampleRequest, id?: number): Promise<{result: boolean, users: Sample[]}> {
    let apiPath = SAMPLE_API_PATH;
    if (id) { apiPath += `/${id}`; }

    const response = await this.get<ISampleRequest, ISampleResponse>(apiPath, request);

    return { result: response.ok, users: response.body.users };
  }

  public async testPost(request: ISampleRequest): Promise<{result: boolean}> {
    const apiPath = SAMPLE_API_PATH;

    const response = await this.post<ISampleRequest, ISampleResponse>(apiPath, request);

    return { result: response.ok };
  }

  public async testPut(request: ISampleRequest, id: number): Promise<{result: boolean}> {
    const apiPath = SAMPLE_API_PATH + `/${id}`;

    const response = await this.put<ISampleRequest, ISampleResponse>(apiPath, request);

    return { result: response.ok };
  }

  public async testDelete(id: number): Promise<{result: boolean}> {
    const apiPath = SAMPLE_API_PATH + `/${id}`;

    const response = await this.delete<any, ISampleResponse>(apiPath, undefined);

    return { result: response.ok };
  }
}
