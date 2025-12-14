import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Admin Panel © {new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
