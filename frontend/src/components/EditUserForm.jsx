import { Form, Input, Button } from 'antd';
import { updateUser } from '../api/user.api';

const EditUserForm = ({ user, onClose, onUpdated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await updateUser(user.id, values);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ name: user.name, email: user.email }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }, { type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" htmlType="submit">Update</Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
