import React from 'react'
import Typewriter from 'typewriter-effect';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

export default function LandingText() {
    return (
        <div>
            <div style={{color:"white", fontSize:"20px", textAlign:"center", height:"150px", marginBottom:'10px'}}>
                <Typewriter
                    options={{
                        loop: false,
                        delay: 70
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .pauseFor(1000)
                            .typeString('Welcome to the Technobar!<br>')
                            .pauseFor(1000)
                            .typeString('Meet the developers')
                            .pauseFor(500)
                            .deleteChars(10)
                            .typeString('<strong>Technophiles</strong> from all around the world.<br>')
                            .pauseFor(1000)
                            .typeString('Go ahead and become a part of the community!')
                            .pauseFor(1000)
                            .start();
                    }}/>
            </div>
            <div className="d-flex justify-content-center" style={{width:"100vw"}}>
                <Button style={{marginRight:"10px",fontSize:"20px",backgroundColor:"orange", border:"none"}} as={Link} to="/register">Get Started</Button>
                <Button variant="secondary" style={{marginLeft:"10px",fontSize:"20px"}} href="https://github.com/Hitansh-Shah/Technobar" target="_blank">View on Github</Button>
            </div>
        </div>
    )
}