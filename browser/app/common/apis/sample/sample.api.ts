import { Sample } from '../../entities/sample/sample.entity';
export const SAMPLE_API_PATH = '/api/sample';

export interface ISamplePathParams {
    id: number;
}

export interface ISampleRequest {
    name: string;
    age: number;
}

export interface ISampleResponse {
    users: Sample[];
}