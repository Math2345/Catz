import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import useAuth from '../hooks/useAuth';


const RequireAuth = observer(({allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation(); 

    return (
        auth.role == allowedRoles
            ? <Outlet />
            : auth
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace /> 
    );
})

export default RequireAuth;