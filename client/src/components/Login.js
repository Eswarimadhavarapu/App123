import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let emailInputRef=useRef()
  let passwordInputRef=useRef()

  let sendSignupDataToServerThruFD=async()=>{
    let dataToSend=new FormData();
    dataToSend.append("email", emailInputRef.current.value)
    dataToSend.append("password", passwordInputRef.current.value)

    let reqOptions={
      method:"POST",
      body:dataToSend,

    };
    let JSONData=await fetch("/login",reqOptions)
    let JSOData=await JSONData.json()
    console.log(JSOData)

    if(JSOData.status=="failure"){
      alert(JSOData.msg);
    }else{
      dispatch({type:"login", data:JSOData.data})
      navigate("/home")
    }
  }
  return (
    <div>
      <form>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <button type="button" onClick={()=>{
          sendSignupDataToServerThruFD(); 
        }}>Login</button>
      </form>
      <div><Link to="/signup">Signup</Link></div>
    </div>
  )
}

export default Login;