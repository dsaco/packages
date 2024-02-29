import { forwardRef, useImperativeHandle, useState } from 'react';
import { Drawer, Button, Form, Input, Select, message } from 'antd';
import { createUser, updateUser, User, CreateUser } from '@/apis/user';

export interface IUserEditRef {
  open: (user?: User) => void;
}

interface IProps {
  onUpdate: () => void;
}

export default forwardRef<IUserEditRef, IProps>(function UserEdit(
  { onUpdate },
  ref,
) {
  const [form] = Form.useForm();

  const [id, setId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const open = (user?: User) => {
    setIsOpen(true);
    if (user?.id) {
      setId(user.id);
      form.setFieldsValue({
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      });
    }
  };
  const onClose = () => {
    setId(undefined);
    setIsOpen(false);
    form.resetFields();
  };
  const onSubmit = () => {
    form.validateFields().then((values: CreateUser) => {
      if (id) {
        updateUser(id, values).then(() => {
          onUpdate();
          onClose();
          message.success('更新成功');
        });
      } else {
        createUser(values).then(() => {
          onUpdate();
          onClose();
          message.success('创建成功');
        });
      }
    });
  };
  useImperativeHandle(ref, () => ({
    open,
  }));
  return (
    <Drawer
      title={id ? '编辑用户' : '新建用户'}
      open={isOpen}
      onClose={onClose}
    >
      <Form form={form} labelCol={{ span: 6 }} initialValues={{ role: 1 }}>
        <Form.Item
          name="name"
          label="用户名"
          rules={[
            {
              max: 16,
              min: 2,
              message: '用户名需在2~16个字符之内',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的手机号',
            },
          ]}
          required
        >
          <Input maxLength={11} disabled={Boolean(id)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              pattern: /^[a-zA-Z\d_]*$/,
              message: '密码必须为字母数字下划线',
            },
            {
              max: 16,
              min: 6,
              message: '密码需在6~16个字符之内',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="角色" required>
          <Select
            options={[
              { value: 1, label: '普通用户' },
              { value: 3, label: '管理员' },
              { value: 9, label: '超级管理员' },
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" onClick={onSubmit}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
});
