import { Document, Model, Schema, Connection } from 'mongoose';

const collectionName = 'sample';

/** サンプル ドキュメント */
export interface SampleDocument extends Document {
  // DB コレクション 型定義 (必ずスキーマと型を適合させる)
  _id: number;
  name: string;
  age: number;
}

const schema = new Schema(
  // スキーマ定義
  {
    _id: Number,
    name: { type: String },
    age: { type: Number }
  },
  // コレクション名を指定 (しないと mongoose が勝手に複数形に変えてしまう)
  { collection: collectionName }
);

/** サンプル モデル */
export const sampleModel = (con: Connection): Model<SampleDocument> => con.model(collectionName, schema);