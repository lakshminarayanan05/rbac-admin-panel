import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return sessionStorage.getItem('token');
}


export const getUser = () => {
  const user = sessionStorage.getItem("user");
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
    sessionStorage.removeItem('token');
    window.location.href = '/'
}