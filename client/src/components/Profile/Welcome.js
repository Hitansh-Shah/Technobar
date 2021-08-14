import React from 'react'
// import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Welcome.css'
import Particles from 'react-particles-js';
import { myaxios, refreshToken } from "../../Connections"

export default function Welcome({ setIsLoggedIn }) {
    const onDelButton = async (e) => {
        // const delButton = document.getElementById("#delButton")
        try {
            const res = await myaxios({
                method: "DELETE",
                url: "api/users/me"
            })
            // console.log(res)
            window.location.reload(false);
        } catch(err) {
            console.log(err.response)
            if(err.response.data.error === "jwt expired") {
                refreshToken(onDelButton, setIsLoggedIn)
            }
        }
    }
    return (
        <div style={{backgroundColor:"black", width:"100%", height:"90vh"}}>
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 100
                        },
                        "size": {
                            "value": 3
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
                className="particles" 
            />
            <div className="contentdiv">
                <div style={{textAlign:"center", color:"white", paddingTop:"200px"}}>
                    <h1>Welcome to the Technobar!!</h1>
                    <br/>
                    <h3>Lets complete/update your profile.</h3>
                </div>
                <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                    <div style={{width:"100%", display:"flex", justifyContent:"center", zIndex:"2"}}>
                        <Button as={Link} to="/welcome/complete_profile" size="lg" variant="primary" style={{marginRight:"10px", zIndex:"2"}}>Lets go!</Button>
                        <Button as={Link} to="/technophiles" size="lg" variant="primary" style={{marginLeft:"10px", zIndex:"2"}}>Later</Button>
                    </div>
                    <Button size="lg" variant="danger" style={{marginLeft:"10px", zIndex:"2", marginTop:"20px"}} id="#delButton" onClick={onDelButton}>Delete Profile</Button>
                </div>

            </div>
        </div>
    )
}