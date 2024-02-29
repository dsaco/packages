import { Row, Col, Form, Input, Button, Space, Select } from 'antd';

export interface UsersSearchParams {
  name?: string;
  role?: number;
}

const Search: React.FC<{
  search: (params?: UsersSearchParams) => void;
}> = ({ search }) => {
  const [form] = Form.useForm<UsersSearchParams>();

  const onReset = () => {
    form.resetFields();
    search();
  };
  const onSearch = () => {
    const values = form.getFieldsValue();
    search(values);
  };

  return (
    <div>
      <Form form={form}>
        <Row gutter={16}>
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
          <Col span={8} className="text-right">
            <Space>
              <Button onClick={onReset}>重置</Button>
              <Button type="primary" onClick={onSearch}>
                查询
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
