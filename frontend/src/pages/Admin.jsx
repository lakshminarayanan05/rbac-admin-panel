import { PlusOutlined } from '@ant-design/icons';
import socket from '../socket/socket'
import { Space, Table, Input, Button, Typography, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, assignRole, removeRole } from '../api/user.api';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

const {Title} = Typography;
const {Search} = Input;
const {confirm} = Modal;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchVal, setSearchVal] = useState('');

  const SUPER_ADMIN_EMAIL = 'admin@gmail.com';

  const isSuperAdmin = (user) => user.email === SUPER_ADMIN_EMAIL;


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    user.email.toLowerCase().includes(searchVal.toLowerCase())
  );

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

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditModalOpen(true);
  }

  const handleDelete = (userId) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteUser(userId);
          message.success('User deleted successfully');
        } catch (err) {
          message.error('Failed to delete user');
          console.error(err);
        }
      },
    });
  };

  const handleToggleAdmin = async (user) => {
    try {
      const isAdmin = user.roles?.some(r => r.name === 'ADMIN');
      if (isAdmin) {
        await removeRole(user.id, 1);
        message.success(`${user.name} is no longer an Admin`);
      } else {
        await assignRole(user.id, 1);
        message.success(`${user.name} is now an Admin`);
      }
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to update role');
    }
  };


  const columns = [
    { title: 'S.No', key: 'sno', 
      render: (_, __, index) => index + 1,
      align: 'center'
    },
    { title: 'Name', dataIndex: 'name', align: 'center'},
    { title: 'Email', dataIndex: 'email', align: 'center'},
    {
      title: 'Role',
      render: (_, record) =>{
        if (record.roles && record.roles.length > 0) {
          return record.roles.map(r => r.name).join(', ');
    }
      },
      align: 'center'
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            disabled={isSuperAdmin(record)}
            onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button 
            type="link" 
            disabled={isSuperAdmin(record)}
            style={{color: 'green'}}  
            onClick={() => handleToggleAdmin(record)}>  
            {record.roles?.some(r => r.name === 'ADMIN') ? 'Remove Admin' : 'Assign as Admin'}
          </Button>
          <Button 
            danger 
            type="link" 
            disabled={isSuperAdmin(record)}
            onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
      align: 'center'
    }
  ]
  return (
    <>
    <Title level={3}>Admin Management</Title>
    <Space
      style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
    >
      <Search placeholder='Search' allowClear style={{width: 300}} onChange={(e) => setSearchVal(e.target.value)}/>
      <Button type='primary' icon={<PlusOutlined/>} onClick={() => setAddModalOpen(true)} >Add User</Button>
    </Space>

    <Table columns={columns} dataSource={filteredUsers} rowKey='id' />

    <Modal
      title="Add User" open={addModalOpen} 
      onCancel={() => setAddModalOpen(false)}
      destroyOnHidden
    > <AddUserForm onClose={() => setAddModalOpen(false)} />
    </Modal>

    <Modal
      title="Edit User"
      open={editModalOpen}
      onCancel={() => setEditModalOpen(false)}
      destroyOnHidden
    >
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </Modal>
    </>
  )
}

export default Admin;