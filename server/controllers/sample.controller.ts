import { SampleAccessor } from '../accessor/db/accessors/sample.accessor';
import { SampleDocument } from '../accessor/db/models/sample.model';
import { Sample } from '../../common/entities/sample/sample.entity';
import { ISamplePathParams, ISampleRequest, ISampleResponse } from '../../common/apis/sample/sample.api';

/** サンプル コントローラ */
export class SampleController {

  public async getUsers(request: ISampleRequest, params?: ISamplePathParams): Promise<ISampleResponse> {
    // ドキュメント検索 実行
    const dbRequest = { id: params.id, name: request.name, age: request.age } as SampleDocument;
    const dbResponse = await new SampleAccessor().select(dbRequest);

    // レスポンス生成
    const users: Sample[] = [];
    for (const element of dbResponse) {
      users.push({ id: element.id, name: element.name, age: element.age });
    }
    const response: ISampleResponse = { users: users };

    return response;
  }

  public async createUser(request: ISampleRequest): Promise<ISampleResponse> {
    // ドキュメント挿入 実行
    const dbRequest = { name: request.name, age: request.age } as SampleDocument;
    const dbResponse = await new SampleAccessor().insert(dbRequest); // 挿入されたドキュメントを返却

    // レスポンス生成
    const response: ISampleResponse = { users: [] };

    return response;
  }

  public async updateUser(request: ISampleRequest, params: ISamplePathParams): Promise<ISampleResponse> {
    // ドキュメント更新 実行
    const dbRequest = { name: request.name, age: request.age } as SampleDocument;
    const dbResponse = await new SampleAccessor().update(params.id, dbRequest); // 更新前のドキュメントを返却

    // レスポンス生成
    const response: ISampleResponse = { users: [] };

    return response;
  }

  public async deleteUser(request: ISampleRequest, params: ISamplePathParams): Promise<ISampleResponse> {
    // ドキュメント削除 実行
    const dbResponse = await new SampleAccessor().delete(params.id); // 削除されたドキュメントを返却

    // レスポンス生成
    const response: ISampleResponse = { users: [] };

    return response;
  }

}
