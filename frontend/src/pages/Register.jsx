import { Card, Input, Typography, Form, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/auth.api';

const { Title, Text, Link } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerApi(values);
      const { user, token } = response.data;

      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);

      message.success('Registration successful!');
      navigate('/dashboard');

    } catch (err) {
      message.error(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        {/* Back Icon */}
        <ArrowLeftOutlined
          style={styles.backIcon}
          onClick={() => navigate('/')}
        />

        <Title level={3} style={{ textAlign: 'center', marginTop: 20 }}>Register</Title>

        <Form layout='vertical' onFinish={onFinish} style={{ marginTop: 20 }}>
          <Form.Item
            label="Name" name='name'
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder='Enter your name' />
          </Form.Item>

          <Form.Item
            label="Email" name='email'
            rules={[
              { required: true, message: "Email is required" },
              { type: 'email', message: 'Enter a valid email' }
            ]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label="Password" name='password'
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item
            label="Confirm Password" name='confirmPassword' dependencies={['password']}
            rules={[
              { required: true, message: "Confirm password is required" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                }
              })
            ]}
          >
            <Input.Password placeholder='Confirm your password' />
          </Form.Item>

          <Button type='primary' htmlType='submit' block>Register</Button>

          <div style={styles.register}>
            <Text type='secondary'>
              Already have an account?
              <Link style={{ display: 'block' }} onClick={() => navigate('/login')}>Login here</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, sans-serif'
  },
  card: {
    width: 400,
    padding: '30px 20px',
    borderRadius: 12,
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  backIcon: {
    fontSize: 20,
    cursor: 'pointer',
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#555'
  },
  register: {
    textAlign: 'center',
    marginTop: 16
  }
}

export default Register;
