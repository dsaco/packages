import { forwardRef, useImperativeHandle, useState } from 'react';
import { Drawer, Button, Form, Input, message, Switch, Select } from 'antd';
import { updateNote, Note, UpdateNote } from '@/apis/note';

export interface INoteEditRef {
  open: (note?: Note) => void;
}

interface IProps {
  onUpdate: () => void;
}

export default forwardRef<INoteEditRef, IProps>(function NoteEdit(
  { onUpdate },
  ref,
) {
  const [form] = Form.useForm();

  const [id, setId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const open = (note?: Note) => {
    setIsOpen(true);
    if (note?.id) {
      setId(note.id);
      form.setFieldsValue(note);
    }
  };
  const onClose = () => {
    setId(undefined);
    setIsOpen(false);
    form.resetFields();
  };
  const onSubmit = () => {
    form.validateFields().then((values: UpdateNote) => {
      if (id) {
        updateNote(id, values).then(() => {
          onUpdate();
          onClose();
          message.success('更新成功');
        });
      }
    });
  };
  useImperativeHandle(ref, () => ({
    open,
  }));
  return (
    <Drawer
      title={id ? '编辑文章' : '新建文章'}
      open={isOpen}
      onClose={onClose}
    >
      <Form form={form} labelCol={{ span: 6 }} initialValues={{ role: 1 }}>
        <Form.Item
          name="title"
          label="标题"
          required
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="public"
          label="状态"
          required
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Switch checkedChildren="公开" unCheckedChildren="隐藏" />
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Select mode="tags" />
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
