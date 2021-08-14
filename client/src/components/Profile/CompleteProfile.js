import React from "react";
import { Container } from "react-bootstrap";
import './CompleteProfile.css'
import MyForm from './Form'
export default function CompleteProfile({setIsLoggedIn}) {
  return(
    <Container className="justify-content-center profilecontainer">
      <div style={{textAlign:"center"}}>
        <h1>Complete/Update your Profile</h1>
        <h6>(<span style={{color:"red"}}>* </span> represents required fields)</h6>
      </div>
      <MyForm setIsLoggedIn={setIsLoggedIn}/>
    </Container>
  )
}