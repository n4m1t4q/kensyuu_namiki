import { HttpMethod } from './http-method.constant';
import { SampleController } from '../controllers/sample.controller';
import { SAMPLE_API_PATH } from '../../common/apis/sample/sample.api';

/** API ルータ一覧 */
export const apiRoutes = [
  { path: SAMPLE_API_PATH, method: HttpMethod.GET, proccess: new SampleController().getUsers },
  { path: `${SAMPLE_API_PATH}/:id`, method: HttpMethod.GET, proccess: new SampleController().getUsers },
  { path: SAMPLE_API_PATH, method: HttpMethod.POST, proccess: new SampleController().createUser },
  { path: `${SAMPLE_API_PATH}/:id`, method: HttpMethod.PUT, proccess: new SampleController().updateUser },
  { path: `${SAMPLE_API_PATH}/:id`, method: HttpMethod.DELETE, proccess: new SampleController().deleteUser },
];
