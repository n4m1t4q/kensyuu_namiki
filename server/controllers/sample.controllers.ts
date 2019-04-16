import { ISamplePathParams, ISampleRequest, ISampleResponse } from '../../common/apis/sample/sample.api';

/** サンプル コントローラ */
export class SampleController {

  public async getUsers(request: ISampleRequest, params?: ISamplePathParams): Promise<ISampleResponse> {

    console.log('=== SampleContoroller #getUsers ===');
    console.log('params: ', params);
    console.log('request: ', request);

    const response: ISampleResponse = {
      users: [{
        id: 1, name: 'GET で API が呼ばれました', age: 11
      }]
    };

    return response;
  }

  public async createUser(request: ISampleRequest): Promise<ISampleResponse> {

    console.log('=== SampleContoroller #createUser ===');
    console.log('request: ', request);

    const response: ISampleResponse = {
      users: [{
        id: 2, name: 'POST で API が呼ばれました', age: 22
      }]
    };

    return response;
  }

  public async updateUser(request: ISampleRequest, params?: ISamplePathParams): Promise<ISampleResponse> {

    console.log('=== SampleContoroller #updateUser ===');
    console.log('params: ', params);
    console.log('request: ', request);

    const response: ISampleResponse = {
      users: [{
        id: 3, name: 'PUT で API が呼ばれました', age: 33
      }]
    };

    return response;
  }

  public async deleteUser(request: ISampleRequest, params?: ISamplePathParams): Promise<ISampleResponse> {

    console.log('=== SampleContoroller #deleteUser ===');
    console.log('params: ', params);
    console.log('request: ', request);

    const response: ISampleResponse = {
      users: [{
        id: 3, name: 'PUT で API が呼ばれました', age: 33
      }]
    };

    return response;
  }

}