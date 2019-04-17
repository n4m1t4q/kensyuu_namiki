import { Express, Request, Response, NextFunction } from 'express';

import { apiRoutes } from '../constants/api-routes.constant';
import { HttpMethod } from '../constants/http-method.constant';

/** API 管理クラス */
export class ApiManager {

  /** 各 API ルータを束ねたミドルウェアを生成 */
  public serve(api: Express) {

    for (const route of apiRoutes) {
      if (route.method === HttpMethod.GET) {
        api.get(route.path, this.proccess(route.proccess));
      } else if (route.method === HttpMethod.POST) {
        api.post(route.path, this.proccess(route.proccess));
      } else if (route.method === HttpMethod.PUT) {
        api.put(route.path, this.proccess(route.proccess));
      } else if (route.method === HttpMethod.DELETE) {
        api.delete(route.path, this.proccess(route.proccess));
      }
    }

  }

  /** API コントローラ呼出 */
  private proccess(controller: (requestData: any, requestParams: any) => Promise<any>) {

    return async (apiReq: Request, apiRes: Response, next: NextFunction) => {
      const httpMethod = apiReq.method;
      const params = apiReq.params;
      const request = (httpMethod === HttpMethod.GET || httpMethod === HttpMethod.DELETE) ? apiReq.query : apiReq.body;

      try {
        const response = await controller(request, params);
        apiRes.status(200).send(response);
      } catch (error) {
        apiRes.status(500).send(error);
      }

    };
  }

}
