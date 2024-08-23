import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import {useEffect, useState} from 'react'
import Task from './Task'
const Home = () => {

  const [isTitle,setTitle]=useState('')
  const [isContent,setContent]=useState('')
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
    fetchingData()
  },[])

  const navigate=useNavigate()
  const logOutButton=()=>{
      Cookies.remove('jwt_token')
      navigate('/login')
  }

  const changeInput=(e)=>{
      setTitle(e.target.value)
  }

    const changeTextArea=(e)=>{
        setContent(e.target.value)
    }

    const fetchingData=async()=>{
      const token=Cookies.get('jwt_token')
      const userId=Cookies.get('user_id')
      const url=`http://localhost:3200/post/${userId}`
        const options={
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }

        try{
            const response = await fetch(url,options)
        
            const data=await response.json()
            console.log(data)
            setTasks(data)
            }
            
        catch(error){
            console.log(`Error: ${error.message}`)
        }
    }

    const handleSubmitFormButton=async(e)=>{
       e.preventDefault()

       const token=Cookies.get('jwt_token')

       const postDetails={"title":isTitle,"content":isContent}

       const url='http://localhost:3200/post'

       const options={
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(postDetails)
       }

       const response=await fetch(url,options)
       const data=await response.json()
       console.log(data)
       fetchingData()
       setTitle("")
       setContent("")
    }

    const deleteTask=async (taskId)=>{
      const token=Cookies.get('jwt_token')
      console.log(taskId)

      const url=`http://localhost:3200/post/${taskId}`
      const options={
          method:"DELETE",
          headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`
          }
      }
      const response=await fetch(url,options)
      const data=await response.json()
      console.log(data)
      fetchingData()
      setTasks(prevTasks => prevTasks.filter(task => task.post_id !== taskId));
      
  }
    
  return (
    <div className="Home-container">
       <nav className="nav-container">
         <h1 className="main-heading">Welcome</h1>
         <h2>Task Manager</h2>
         <button type="button" onClick={logOutButton}>Log out</button>
       </nav>

       
       <div className='inner-home-container'> 
       <form className="form-container-2" onSubmit={handleSubmitFormButton}>
         <div className="title-container">
          <label htmlFor="text" className="text-label">Title</label>
          <input id="text" type="text" placeholder="Enter task name" value={isTitle} className="text-input" onChange={changeInput} />
         </div>
         <div className="textarea-container">
          <label htmlFor='textarea' className="text-label">Content</label>
          <textarea id="textarea" placeholder='Enter task content' value={isContent}  className='textarea' onChange={changeTextArea} />
         </div>
         <button type='submit'>Submit</button>
       </form>

        <div className="title-content-first-container">
          <Task tasks={tasks} deleteTask={deleteTask} />
        </div>
       </div>
    </div>
  )
}

export default Home
