import Cookies from 'js-cookie'
import {Navigate,Outlet} from 'react-router-dom'

const PublicRoute = () => {

    const token=Cookies.get('jwt_token')
    if(token){
        return <Navigate to="/" />
    }
    
    return <Outlet />
}

export default PublicRoute
