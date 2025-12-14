import { Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.left}>
        <Title level={1} style={{ color: '#fff', marginBottom: 20 }}>
          Welcome to Admin Panel
        </Title>
        <Text style={{ color: '#e0e0e0', fontSize: 16, lineHeight: '1.8' }}>
          Manage users, assign roles, and maintain a secure environment with ease.
        </Text>
      </div>

      {/* Right Section */}
      <div style={styles.right}>
        <div style={styles.card}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
            Get Started
          </Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              style={styles.buttonPrimary}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>

            <Button
              size="large"
              icon={<UserAddOutlined />}
              style={styles.buttonSecondary}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Inter, sans-serif',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '80px',
    color: '#fff',
    background:
      'url(https://images.unsplash.com/photo-1581091215364-4c253f0f157b?auto=format&fit=crop&w=800&q=80) no-repeat center/cover',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    padding: '40px',
    borderRadius: 16,
    backgroundColor: '#fff',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  buttonPrimary: {
    width: '100%',
    fontWeight: 600,
    borderRadius: 8,
    transition: 'all 0.3s ease',
  },
  buttonSecondary: {
    width: '100%',
    fontWeight: 600,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
    transition: 'all 0.3s ease',
  },
};

export default Home;
