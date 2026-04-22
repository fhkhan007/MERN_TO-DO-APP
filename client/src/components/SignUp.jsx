import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp(){

    const [userData,setUserData]=useState({
        name:'',
        email:'',
        password:''
    })

    const navigate= useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('login')){
            navigate('/')
        }
    },[])

    const handleSignUp= async()=>{
        console.log(userData);

        let result= await fetch('http://localhost:3200/signup',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'application/json'
            }
        })

        result= await result.json()

        if(result.success){
           console.log(result);

           document.cookie = `token=${result.token}; path=/`
           localStorage.setItem('login','true')
           localStorage.setItem('user', JSON.stringify(result.user))

           navigate('/')
        }else{
            alert("Try after sometime")
        }
    }

    return(
        <div className="container">
            <h1>Sign Up</h1>
            
            <label>Name</label>
            <input 
                onChange={(e)=>setUserData({...userData,name:e.target.value})} 
                type="text" placeholder="Enter user name "
            />

            <label>Email</label>
            <input 
                onChange={(e)=>setUserData({...userData,email:e.target.value})} 
                type="text" placeholder="Enter user email "
            />

            <label>Password</label>
            <input 
                onChange={(e)=>setUserData({...userData,password:e.target.value})} 
                type="password" placeholder="Enter user password "
            />

            <button onClick={handleSignUp} className="submit">Sign up</button>
            <Link className='link' to="/login">Login</Link>
        </div>
    )
}