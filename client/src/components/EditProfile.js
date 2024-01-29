import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function EditProfile() {
  let firstNameInputRef=useRef()
  let lastNameInputRef=useRef()
  let emailInputRef=useRef()
  let genderInputRef=useRef()
  let ageInputRef=useRef()
  let passwordInputRef=useRef()
  let countryInputRef=useRef()
  let profilePicInputRef=useRef()
  let [profilePicPath,setProfilePicPath]=useState("./images/noImage.jpg")

  let storeObj=useSelector((store)=>{
    return store;
  })

  useEffect(()=>{
    firstNameInputRef.current.value=storeObj.loginDetails.firstName;
    lastNameInputRef.current.value=storeObj.loginDetails.lastName;
    emailInputRef.current.value=storeObj.loginDetails.email;
    genderInputRef.current.value=storeObj.loginDetails.gender;
    //ageInputRef.current.value=storeObj.loginDetails.age;
    ageInputRef.current.value=storeObj.loginDetails.age
    countryInputRef.current.value=storeObj.loginDetails.country;
    setProfilePicPath(`/${storeObj.loginDetails.profilePic}`)
  },[])
  



  // let sendSignupDataToServerThruJSON=async()=>{
  //   let dataToSend={
  //     firstName:firstNameInputRef.current.value,
  //     lastName:lastNameInputRef.current.value,
  //     email:emailInputRef.current.value,
  //     gender:genderInputRef.current.value,
  //     dateOfBirth:dobInputRef.current.value,
  //     password:passwordInputRef.current.value,
  //     country:countryInputRef.current.value,
  //     profilePic:profilePicInputRef.current.value,


  //   };
  //    let dataToSendInJson=JSON.stringify(dataToSend);

  //    let myHeader=new Headers();
  //    myHeader.append("content-type","application/json")

  //    let reqOptions={
  //     method:"POST",
  //     body:dataToSendInJson,
  //     headers:myHeader,
  //    };
  //    let JSONData=await fetch("/signup",reqOptions);
  //    let JSOData= await JSONData.json();
  //    console.log(JSOData);
  // }


  // let sendSignupDataToServerThruURLE=async()=>{
  //   let dataToSend=new URLSearchParams();
  //   dataToSend.append("firstName", firstNameInputRef.current.value)
  //   dataToSend.append("lastName", lastNameInputRef.current.value)
  //   dataToSend.append("email", emailInputRef.current.value)
  //   dataToSend.append("gender", genderInputRef.current.value)
  //   dataToSend.append("dateofBirth", dobInputRef.current.value)
  //   dataToSend.append("password", passwordInputRef.current.value)
  //   dataToSend.append("country", countryInputRef.current.value)
  //   dataToSend.append("profilePic", profilePicInputRef.current.value);

  //   let myHeader=new Headers()
  //   myHeader.append("content-type","application/x-www-form-urlencoded")


  //   let reqOptions={
  //     method:"POST",
  //     body:dataToSend,
  //     headers:myHeader,
  //   };
  //   let JSONData=await fetch("/signup",reqOptions)
  //   let JSOData=await JSONData.json()
  //   console.log(JSOData)

  // }

  let sendUpdateDataToServerThruFD=async()=>{
    let dataToSend=new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value)
    dataToSend.append("lastName", lastNameInputRef.current.value)
    dataToSend.append("email", emailInputRef.current.value)
    dataToSend.append("gender", genderInputRef.current.value)
    dataToSend.append("age", ageInputRef.current.value)
    dataToSend.append("password", passwordInputRef.current.value)
    dataToSend.append("country", countryInputRef.current.value)

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }



    // let myHeader=new Headers()
    // myHeader.append("content-type","application/x-www-form-urlencoded")


    let reqOptions={
      method:"PUT",
      body:dataToSend,
      // headers:myHeader,
    };
    let JSONData=await fetch("/updateProfile",reqOptions)
    let JSOData=await JSONData.json()
    if (JSOData.status=="success"){
      alert(JSOData.msg);
    } else{
      alert(JSOData.msg)
        
    }
    console.log(JSOData)

  }

  
  return (
    <div className='App'>
      <TopNavigation/>
      <form>
        <h2>EditProfile</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Gender</label>
          <input ref={genderInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Country</label>
          <input ref={countryInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input ref={profilePicInputRef} type="file" 
             onChange={(eventObj)=>{
             let selectedImagePath=URL.createObjectURL(eventObj.target.files[0]);
             setProfilePicPath(selectedImagePath);
          }}
          ></input>
        </div>
        <div>
          <img className='profilePic' src={profilePicPath}></img>
        </div>

        <button type="button" onClick={()=>{
          sendUpdateDataToServerThruFD();
          
        }}>Update Profile</button>
      </form>
      
    </div>
  )
}

export default EditProfile;