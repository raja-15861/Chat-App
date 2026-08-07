import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";


function protectedRoute({children}){

const { token } = useSelector((state) => state.auth);
const profileUser = useSelector((state) => state.profile?.user);

if (token || profileUser) {
  return children;
}
return <Navigate to='/signup' />;
}

export default protectedRoute;