import './LoginRoute.css'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const LoginRoute = () => {

    const [user,setUsername]=useState('')
    const [pass,setPassword]=useState('')
    const [isSignup,setIsSignUp]=useState(true)

    const [data,setData]=useState('')

    const navigate=useNavigate()

    const onChangeUsername=(e)=>{
        setUsername(e.target.value)
    }

    const onChangePassword=(e)=>{
        setPassword(e.target.value)
    }

    const onSubmitSuccess=(jwtToken,userId)=>{
        Cookies.set('jwt_token',jwtToken,{expires:30})
        Cookies.set('user_id',userId,{expires:30})
        navigate('/')
        console.log(jwtToken,userId)
    }
 
    const handleFormData=async(event)=>{
        event.preventDefault()
        const userDetails={username:user,password:pass}
        const url=isSignup?(`http://localhost:3200/user`):(`http://localhost:3200/login`)
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails)
        }
        const response=await fetch(url,options)
        
        if(response.ok===true){
            const data=await response.json()
            setData(data)
            onSubmitSuccess(data.jwtToken,data.user_id)
        }
    }
    
    const toggleSignup=()=>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }


  return (
    <div className="login-bg-container">
            <form className='form-container' onSubmit={handleFormData}>
                <div>
                    <h1>{isSignup?'Sign Up':'Login'}</h1>
                </div>
                <div className='username'>
                    <label htmlFor='username' className='username-label'>USERNAME</label>
                    <input id="username" type="text" placeholder='Enter your username' className="username-input" value={user} onChange={onChangeUsername} />
                </div>
                <div className='username'>
                    <label htmlFor='password' className='username-label'>PASSWORD</label>
                    <input id="password" type="password" placeholder='Enter your password' className="username-input" value={pass} onChange={onChangePassword} />
                </div>

                <p>{data}</p>

                <div className="button-container">
                    <button type="submit">{isSignup?"Sign up":"Login"}</button>
                    <button type="button" onClick={toggleSignup}>{isSignup?"Login":"Sign up"}</button>
                </div>
            </form>
    </div>
  )
}

export default LoginRoute
