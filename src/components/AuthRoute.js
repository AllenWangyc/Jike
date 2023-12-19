import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";


/**
 * 
 * @param {props} children 
 * @returns successfully return specified component if token exist, or navigate to '/login'
 */
export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}