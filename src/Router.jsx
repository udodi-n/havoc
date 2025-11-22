import { Navigate } from "react-router-dom";
import { auth } from './firebase'

const Router = () => {
    const user = localStorage.getItem("user");
    
    if (!user) {
        return <Navigate to = "/hero" replace />;
    }
    return <Navigate to = "/home" replace />
}

export default Router;