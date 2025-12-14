import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
// import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const PrivateLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sidebar /> */}

      <Layout>
        <AppHeader />

        <Content style={{ padding: '24px' }}>
          <Outlet />
        </Content>

        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
