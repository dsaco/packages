import { ILoginParamsCode, ILoginParamsPassword, login } from '@/apis/auth';
import { useAuthStore } from '@/stores/authStore';
import { Tabs, Form, Input, Button, Row, Col, message } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const setUserinfo = useAuthStore((state) => state.setUserinfo);

  const [formPassword] = Form.useForm();
  const [formCode] = Form.useForm();
  const [type, setType] = useState('password');

  const [second, setSecond] = useState(0);

  const onSubmit = () => {
    if (type === 'password') {
      formPassword.validateFields().then((values: ILoginParamsPassword) => {
        login(values).then((userinfo) => {
          if (userinfo.role < 3) {
            message.warning('权限不足，请尝试其他账号');
          } else {
            setUserinfo(userinfo);
            navigate('/');
          }
        });
      });
    } else {
      formCode.validateFields().then((values: ILoginParamsCode) => {
        login(values).then((userinfo) => {
          if (userinfo.role < 3) {
            message.warning('权限不足，请尝试其他账号');
          } else {
            setUserinfo(userinfo);
            navigate('/');
          }
        });
      });
    }
  };

  const timer = useRef<NodeJS.Timeout>();

  const getSms = () => {
    setSecond(60);
    timer.current = setInterval(() => {
      setSecond((prev) => {
        if (prev === 0) {
          clearInterval(timer.current);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };
  return (
    <div className="h-screen flex justify-around items-center flex-col p-4">
      <div className="max-w-[320px] w-full">
        <Tabs
          activeKey={type}
          onChange={setType}
          centered
          items={[
            {
              key: 'password',
              label: '账号密码登录',
              children: (
                <Form form={formPassword} initialValues={{ type: 'password' }}>
                  <Form.Item name="type" hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '请输入正确的手机号',
                      },
                    ]}
                  >
                    <Input placeholder="手机号" maxLength={11} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password placeholder="密码" />
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'code',
              label: '手机号登录',
              children: (
                <Form form={formCode} initialValues={{ type: 'code' }}>
                  <Form.Item name="type" hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: '请输入正确的手机号',
                      },
                    ]}
                  >
                    <Input placeholder="手机号" maxLength={11} />
                  </Form.Item>
                  <Form.Item>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Form.Item
                          noStyle
                          name="code"
                          rules={[{ required: true, message: '请输入验证码' }]}
                        >
                          <Input placeholder="验证码" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Button block onClick={getSms} disabled={second !== 0}>
                          {second === 0 ? '获取验证码' : `${second}秒`}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
        <Button type="primary" block onClick={onSubmit}>
          登录
        </Button>
      </div>
      <span></span>
    </div>
  );
}
