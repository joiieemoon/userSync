import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { canPermit } from "../../helper/canPermit/canpermit";

const RoleProtectedRoute = ({ module, action, children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const permissions = useSelector(
    (state: RootState) => state.userPermissions.permissions,
  );

  if (!user) return <Navigate to="/login" replace />;
  console.log(user);
  if (!canPermit(permissions, module, action)) {
    return <Navigate to="/unauthorized" replace />;
  }
  console.log();
  return children;
};

export default RoleProtectedRoute;
