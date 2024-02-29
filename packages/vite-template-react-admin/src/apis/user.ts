import { request } from '@/utils';

export interface User {
  id: number;
  name: string;
  mobile: string;
  role?: number;
}
export interface CreateUser {
  name?: string;
  mobile: string;
  password?: string;
}

export const getUsers = (params: {
  pageSize: number;
  current: number;
  name?: string;
  role?: number;
}) => request.get<API.ResponseRecords<User>>('/api/users/page', params);

export const createUser = (data: CreateUser) =>
  request.post('/api/users', data);

export const updateUser = (id: number, data: CreateUser) =>
  request.patch(`/api/users/${id}`, data);

export const deleteUser = (id: number) => request.delete(`/api/users/${id}`);
