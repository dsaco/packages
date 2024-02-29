import { useEffect, useRef } from 'react';
import {
  Button,
  Space,
  Popconfirm,
  Tag,
  TableColumnsType,
  Col,
  Form,
  Input,
  Select,
} from 'antd';
import { deleteUser, User } from '@/apis/user';

import UserEdit, { IUserEditRef } from './components/UserEdit';

import TableList, { ITableRef } from '@/components/TableList';

export default function UserList() {
  const editRef = useRef<IUserEditRef>(null);

  const openEdit = (user?: User) => {
    editRef.current?.open(user);
  };

  const onDel = (id: number) => {
    deleteUser(id);
  };

  const columns: TableColumnsType<User> = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'mobile',
      title: '手机号',
    },
    {
      dataIndex: 'name',
      title: '用户名',
    },
    {
      dataIndex: 'role',
      title: '角色',
      render: (text: number) => {
        switch (text) {
          case 1:
            return <Tag color="lime">普通用户</Tag>;
          case 3:
            return <Tag color="cyan">管理员</Tag>;
          case 9:
            return <Tag color="blue">超级管理员</Tag>;
          default:
            return '';
        }
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
              title="删除此用户"
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
        url="/api/users/page"
        filter={
          <>
            <Col span={8}>
              <Form.Item label="用户名" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="角色" name="role">
                <Select
                  options={[
                    { value: '', label: '全部' },
                    { value: 1, label: '普通用户' },
                    { value: 3, label: '管理员' },
                    { value: 9, label: '超级管理' },
                  ]}
                />
              </Form.Item>
            </Col>
          </>
        }
        toolbox={
          <div className="flex justify-between items-center mb-4">
            <span></span>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  openEdit();
                }}
              >
                新建
              </Button>
            </div>
          </div>
        }
      ></TableList>

      <UserEdit
        ref={editRef}
        onUpdate={() => {
          tableRef.current?.reload();
        }}
      />
    </>
  );
}
