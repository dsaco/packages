import { useEffect, useRef } from 'react';
import {
  Button,
  Space,
  Popconfirm,
  TableColumnsType,
  Col,
  Form,
  Input,
  Badge,
  Tag,
  Select,
} from 'antd';
import { deleteNote, Note } from '@/apis/note';

import NoteEdit, { INoteEditRef } from './components/NoteEdit';

import TableList, { ITableRef } from '@/components/TableList';

export default function NoteList() {
  const editRef = useRef<INoteEditRef>(null);

  const openEdit = (note?: Note) => {
    editRef.current?.open(note);
  };

  const onDel = (id: number) => {
    deleteNote(id);
  };

  const columns: TableColumnsType<Note> = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'title',
      title: '标题',
      width: 200,
    },
    {
      dataIndex: 'public',
      title: '状态',
      width: 100,
      render: (text: boolean) => {
        if (text) {
          return <Badge status="processing" text="公开" />;
        } else {
          return <Badge status="default" text="隐藏" />;
        }
      },
    },
    {
      dataIndex: 'tags',
      title: '标签',
      render: (tags: string[]) => {
        return tags?.map((tag) => <Tag key={tag}>{tag}</Tag>);
      },
    },
    {
      dataIndex: 'createTime',
      title: '创建日期',
    },
    {
      dataIndex: 'updateTime',
      title: '修改日期',
    },
    {
      dataIndex: 'updateTime',
      title: '操作',
      fixed: 'right',
      render: (text, record) => {
        return (
          <Space>
            <Button
              onClick={() => {
                openEdit(record);
              }}
              type="link"
              size="small"
            >
              修改
            </Button>
            <Popconfirm
              title="删除此文章"
              description="确认删除此条数据吗? 删除后不可恢复"
              onConfirm={() => onDel(record.id)}
            >
              <Button type="link" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    tableRef.current?.reload();
  }, []);

  const tableRef = useRef<ITableRef>(null);

  return (
    <>
      <TableList
        columns={columns}
        ref={tableRef}
        url="/api/notes/page"
        filter={
          <>
            <Col span={6}>
              <Form.Item label="标题" name="title">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="标签" name="tags">
                <Select mode="tags" allowClear />
              </Form.Item>
            </Col>
          </>
        }
      />

      <NoteEdit
        ref={editRef}
        onUpdate={() => {
          tableRef.current?.reload();
        }}
      />
    </>
  );
}
