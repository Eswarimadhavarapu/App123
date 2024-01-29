import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Home() {
  let storeObj=useSelector((store)=>{
    return store
  })
  console.log("inside Home")
  console.log(storeObj)
  return (
    <div>
      <TopNavigation/>
      <img src={`/${storeObj.loginDetails.profilePic}`}></img>
      <h2>Name: {storeObj.loginDetails.firstName}{" "}{storeObj.loginDetails.lastName}</h2>
      <h2>Batch:2309</h2>
      <h2>Course:MERN Stack</h2>
    </div>
  )
}

export default Home