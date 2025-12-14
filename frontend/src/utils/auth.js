import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem('token');
}


export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserFromToken = () => {
    const token = getToken();
    if(!token){
        return null;
    }
    try{
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'
}