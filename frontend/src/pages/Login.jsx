import { Card, Form, Typography, Input, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { loginApi } from '../api/auth.api';

const { Title, Text, Link } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Login values:', values);
        try {
            const res = await loginApi(values);
            const { token, user } = res.data;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            message.success('Login successful!');

            if (user.roles.includes('ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            message.error(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                {/* Back icon */}
                <ArrowLeftOutlined 
                    style={styles.backIcon} 
                    onClick={() => navigate('/')} 
                />

                <Title level={3} style={{ textAlign: 'center', marginTop: 20 }}>Login</Title>

                <Form layout='vertical' onFinish={onFinish} style={{ marginTop: 20 }}>
                    <Form.Item
                        label="Email" name="email"
                        rules={[
                            { required: true, message: 'Email is required' },
                            { type: 'email', message: 'Enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password" name="password"
                        rules={[
                            { required: true, message: "Password is required" }
                        ]}
                    >
                        <Input.Password placeholder='Enter your password' />
                    </Form.Item>

                    <Button type='primary' htmlType='submit' block>Login</Button>

                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <Text type='secondary'>
                            Don't have an account?
                            <Link style={{ display: 'block' }} onClick={() => navigate("/register")}>Register here</Link>
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
    }
}

export default Login;
