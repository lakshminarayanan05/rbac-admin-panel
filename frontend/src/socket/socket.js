import { io } from 'socket.io-client';
import { getToken } from '../utils/auth';

const socket = io('http://localhost:3000', {
  auth: {
    token: getToken(),
  },
});

export default socket;
