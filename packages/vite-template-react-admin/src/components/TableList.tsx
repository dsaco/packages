/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Button,
  Form,
  Row,
  Space,
  Table,
  TableProps,
  TablePaginationConfig,
} from 'antd';

import { request } from '@/utils';

export type AnyObject = Record<PropertyKey, any>;

export interface ITableListProps<T> extends TableProps<T> {
  url: string;
  toolbox?: React.ReactNode;
  filter?: React.ReactNode;
}

export interface ITableRef {
  reload: () => void;
}

function TableList<T extends AnyObject>(
  { rowKey = 'id', url, columns, toolbox, filter }: ITableListProps<T>,
  ref: React.Ref<ITableRef>,
) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50', '100'],
  });

  const search = () => {
    const values = form.getFieldsValue();
    getData(pagination.pageSize, 1, values);
  };
  const reload = () => {
    const values = form.getFieldsValue();
    getData(pagination.pageSize, pagination.current, values);
  };

  const getData = (pageSize = 10, current = 1, params: Record<string, any>) => {
    setLoading(true);
    request
      .get<API.ResponseRecords<T>>(url, { pageSize, current, ...params })
      .then(({ records, total }) => {
        setDataSource(records);
        setPagination((prev) => ({
          ...prev,
          total,
          pageSize,
          current,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    reload,
  }));

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    search();
  };

  const handleTableChange = ({ pageSize, current }: TablePaginationConfig) => {
    const values = form.getFieldsValue();
    getData(pageSize, current, values);
  };

  return (
    <>
      <div className="p-6 pb-0 bg-white rounded-lg mb-4">
        <Form form={form}>
          <div className="flex justify-between items-start">
            <Row gutter={16} className="flex-1">
              {filter}
            </Row>
            <Space>
              <Button onClick={onReset}>重置</Button>
              <Button type="primary" onClick={search}>
                查询
              </Button>
            </Space>
          </div>
        </Form>
      </div>
      <div className="p-6 pb-0 bg-white rounded-lg">
        {toolbox}
        <Table
          rowKey={rowKey}
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

const RefTableList = forwardRef<ITableRef, ITableListProps<any>>(TableList);

export default RefTableList;
