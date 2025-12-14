import { Form, Input, Button,message } from 'antd';
import { createUser } from '../api/user.api';

const AddUserForm = ({ onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try{
            const data = await createUser(values);
            message.success('User created successfully');
        } catch (err) {
            message.error(err.response?.data?.error || 'Failed to create user')
        }
        onClose();
        form.resetFields();
    }
    return (
        <>
         <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required' }]}
            ><Input /></Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
                ]}
            ><Input /></Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
            ><Input.Password /></Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Create</Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default AddUserForm;