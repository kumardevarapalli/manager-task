import LoginRoute from './LoginRoute/LoginRoute.jsx';
import Home from './Home/Home.jsx'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import PublicRoute from './ProtectedRoute/PublicRoute.jsx';
import {Routes,Route} from 'react-router-dom'
const App = () =>(
  <Routes>
    <Route element={<PublicRoute/>}>
      <Route  path='/login' element={<LoginRoute/>}/>
    </Route>
    <Route path='/' element={<ProtectedRoute/>}>
      <Route path='/' element={<Home/>}/>
    </Route>
  </Routes>
)

export default App
