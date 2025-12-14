import { Table, Input, Typography, Space } from 'antd';
import socket from '../socket/socket';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/user.api';

const { Title } = Typography;
const { Search } = Input;

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
    const events = [
      'USER_CREATED',
      'USER_UPDATED',
      'USER_DELETED',
      'ROLE_ASSIGNED',
      'ROLE_REMOVED',
    ];

    events.forEach(event => socket.on(event, loadUsers));

    return () => {
      events.forEach(event => socket.off(event, loadUsers));
    };
  }, []);

  const loadUsers = async () => {
    try{
      const data = await fetchUsers();
      setUsers(data);
      
    } catch (err) {
      message.error('Failed to load users');
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: 'S.No', key: 'sno', 
      render: (_, __, index) => index + 1,
      align: 'center'
    },
    { title: 'Name', dataIndex: 'name', align: 'center' },
    { title: 'Email', dataIndex: 'email', align: 'center' },
    {
      title: 'Role',
      render: (_, record) =>{
        if (record.roles && record.roles.length > 0) {
          return record.roles.map(r => r.name).join(', ');
        }
      }, align: 'center'
    },
  ];

  return (
    <>
      <Title level={3}>Users</Title>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search users"
          allowClear
          style={{ width: 300 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
      />
    </>
  );
};

export default UserDashboard;
