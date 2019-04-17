import { ConnectionOptions, createConnection, Connection } from 'mongoose';

/** DB アクセサ 基底クラス */
export class DbAccessor {

  /** DB 接続 */
  protected async createConnection(): Promise<Connection> {
    // TODO: 後々 config ファイルなどに移行
    const URI = 'mongodb://localhost:27017';
    const OPTIONS = {
      useNewUrlParser: true, // 推奨のパーサ設定記述
      dbName: 'sample', // 接続する DB
      //user: 'admin', // 認証ユーザ ID
      //pass: 'Zaq12wsx', // 認証パスワード
      //auth: { authdb: 'admin'}, // 認証用 DB 指定
    } as ConnectionOptions;

    return await createConnection(URI, OPTIONS);

  }

}
