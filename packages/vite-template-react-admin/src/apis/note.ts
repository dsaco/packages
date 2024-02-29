import { request } from '@/utils';

export interface Note {
  id: number;
  title: string;
  public: boolean;
  tags: string[];
}

export interface UpdateNote {
  title: string;
  public: boolean;
  tags: string[];
}

export const getNotes = (params: {
  pageSize: number;
  current: number;
  title?: string;
  public?: boolean;
  tags?: string[];
}) => request.get<API.ResponseRecords<Note>>('/api/notes/page', params);

export const updateNote = (id: number, data: UpdateNote) =>
  request.patch(`/api/notes/${id}`, data);

export const deleteNote = (id: number) => request.delete(`/api/notes/${id}`);
