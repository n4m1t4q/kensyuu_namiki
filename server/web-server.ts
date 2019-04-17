import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ApiManager } from './managers/api.manager';

const webServer = express();
const PORT = process.env.PORT || 3000;
const CLIENT_DIST_PATH = join(process.cwd(), 'dist/demo-namiki'); // TODO: パスをアプリ名に合わせる
// 動的に生成される dist ファイルため、require() のままにしておく
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(join(process.cwd(), 'dist/demo-namiki-server/main')); // TODO: パスをアプリ名に合わせる

// テンプレートファイル名で拡張子が省略された場合のデフォルト拡張子を設定
webServer.set('view engine', 'html');
// テンプレートファイルを置くパスを設定
webServer.set('views', CLIENT_DIST_PATH);
// レンダリングに利用するテンプレートエンジンに Angular Express エンジン を登録
webServer.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [ provideModuleMap(LAZY_MODULE_MAP) ]
}));
// サーバサイドレンダリングされる静的ファイル
webServer.get('*.*', express.static(CLIENT_DIST_PATH));

// HTTP ボディ JSON 送信対応
webServer.use(bodyParser.urlencoded({ extended: true }));
webServer.use(bodyParser.json({ limit: '100kb' })); // Limit オプションでリクエストボディサイズ設定 (デフォルト: 100KB)
// API ルーティング提供
new ApiManager().serve(webServer);

// テンプレート SSR: 全ての通常ルートは Universal エンジンを使用
webServer.get('*', (req, res) => res.render('index', { req, res }));

// Node サーバ開始
webServer.listen(PORT, () => {
  console.log(`Node server is listening - http://localhost:${PORT}`);
});