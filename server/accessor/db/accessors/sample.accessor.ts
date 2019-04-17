import { DbAccessor } from '../db.accessor';
import { sampleModel, SampleDocument } from '../models/sample.model';

/** サンプル アクセサ */
export class SampleAccessor extends DbAccessor {

  /** 参照 */
  public async select(request: SampleDocument): Promise<SampleDocument[]> {

    const connection = await this.createConnection();
    const model = sampleModel(connection);

    // WHERE 句
    const whereCluse: SampleDocument = {} as SampleDocument;
    if (request.id) { whereCluse._id = request.id; }
    if (request.name) { whereCluse.name = request.name; }
    if (request.age) { whereCluse.age = request.age; }

    // ドキュメント取得
    return await model.find(whereCluse);
  }

  /** 挿入 */
  public async insert(request: SampleDocument): Promise<any> {

    const connection = await this.createConnection();
    const model = sampleModel(connection);

    // _id で降順に並び替え、最大値を取得
    const lastDocument = await model.findOne().select('_id').sort({ '_id': -1 });
    request._id = lastDocument ? lastDocument._id + 1 : 1;

    // 新 id でドキュメント作成
    return await model.create(request);
  }

  /** 更新 */
  public async update(id: number, request: SampleDocument): Promise<any> {

    const connection = await this.createConnection();
    const model = sampleModel(connection);

    // SET 句
    const setCluse: SampleDocument = {} as SampleDocument;
    if (request.name) { setCluse.name = request.name; }
    if (request.age) { setCluse.age = request.age; }

    return await model.findOneAndUpdate({_id: id}, setCluse);
  }

  /** 物理削除 */
  public async delete(id: number): Promise<any> {

    const connection = await this.createConnection();
    const model = sampleModel(connection);

    return await model.findByIdAndDelete(id);
  }
}