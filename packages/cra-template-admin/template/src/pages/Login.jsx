import { useNavigate } from 'react-router-dom';
import { Button, Input, Form } from 'antd';

import { useUserStore } from '@/stores/userStore';

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const setUser = useUserStore((state) => state.setUser);

  const onFinish = async (values) => {
    // login(values);
    console.log(values);
    setUser({ username: '章三利斯' });
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="my-10 text-2xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <Form form={form} layout="vertical" className="w-80" onFinish={onFinish}>
        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[{ required: true, message: 'Please input your Mobile' }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password' }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block className="mt-4">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
