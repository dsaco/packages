import { request } from '@/utils';

export interface ILoginParamsPassword {
  mobile: number;
  password: string;
  type: 'password';
}

export interface ILoginParamsCode {
  mobile: number;
  code: string;
  type: 'code';
}

export interface IUserinfo {
  id: number;
  mobile: string;
  name: string;
  role: number;
}

export const login = (data: ILoginParamsPassword | ILoginParamsCode) =>
  request.post<IUserinfo>('/api/auth/login', data);
