import React, {useState, useEffect} from 'react';
import {Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navigation.css';
import Icon from './id_card.png'

function Navigation(props) {
    
    useEffect(() => {
        const links = [...document.getElementsByClassName('nav-link')]
        links.forEach((link) => {
            if(link.getAttribute('href') === props.route) {
                link.classList.add('route')
            } else {
                link.classList.remove('route')
            }
        })
    })
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center mynavbar">
            <Container className="margin">
                <Navbar.Brand as={Link} to="/" className="technobar"><div style={{display:"flex", justifyContent:"center"}}><Image src={Icon} width="50"/><div style={{display:"flex", alignItems:"center"}}><h3 style={{ marginLeft:"10px", marginBottom:"0px"}}>Technobar</h3></div></div></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    {props.isLoggedIn ?
                        <Nav>
                            <Nav.Link as={Link} to="/technophiles" className="spacing">Technophiles</Nav.Link>
                            <Nav.Link as={Link} to="/welcome" className="spacing">Dashboard</Nav.Link>
                            <Button variant="light" className="spacing" onClick={props.onLogout} size="sm">Logout</Button>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link as={Link} to="/technophiles" className="spacing">Technophiles</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="spacing">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login" className="spacing">Login</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation;