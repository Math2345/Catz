import { useLocation, Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

const RequireAuth = observer(({allowedRoles }) => {
    const location = useLocation(); 

    const role = sessionStorage.getItem('role')

    return (
        role === allowedRoles
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
})

export default RequireAuth;