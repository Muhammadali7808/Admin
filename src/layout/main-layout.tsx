import React, { useState } from 'react';
import { AppstoreOutlined, CopyOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case '1':
        navigate('/app/category-list');
        break;
      case '2':
        navigate('/app/sub-category-list');
        break;
      case '3':
        navigate('/app/brand-list');
        break;
      case '4':
        navigate('/app/product');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: 'Category List',
            },
            {
              key: '2',
              icon: <CopyOutlined />,
              label: 'Sub Category List',
            },
            {
              key: '3',
              icon: <TrademarkCircleOutlined />,
              label: 'Brand List',
            },
            {
              key: '4',
              icon: <ShoppingOutlined />,
              label: 'Product',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
