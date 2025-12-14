import { Navigate } from "react-router-dom";
import { getToken, getUserFromToken } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
    const token = getToken();
    const user = getUserFromToken();

    if(!token || !user){
        return <Navigate to='/login' replace/>;
    }

    if(role && !user.roles.includes(role)){
        return <Navigate to='/' replace/>;
    }

    return children;
}

export default ProtectedRoute;