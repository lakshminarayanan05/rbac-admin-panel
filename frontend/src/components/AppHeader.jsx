import { Layout, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = [
    {
      key: 'profile',
      label: (
        <div>
          <strong>{user?.name}</strong>
          <br />
          <span style={{ fontSize: 12 }}>{user?.email}</span>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Header style={styles.header}>
      <h3 style={{ color: 'white' }}>Admin Panel</h3>

      <Dropdown menu={{ items }} placement="bottomRight">
        <div style={styles.profile}>
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: 'white', marginLeft: 8 }}>
            {user?.name}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
  },
  profile: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
};

export default AppHeader;
