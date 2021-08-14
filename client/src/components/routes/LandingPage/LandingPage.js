import React, {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import './LandingPage.css'
import LandingText from './LandingText'

export default function LandingPage(props) {
    
    useEffect(() => {
        function handleResize() {
            let imgHeight = window.innerHeight - 68.99
            if(document.querySelector('.mainContainer').clientHeight < 69) {
                imgHeight = window.innerHeight - document.querySelector('.mainContainer').clientHeight
            }
            const elem = document.querySelector('.landing')
            if(elem) {
                elem.style.height = `${imgHeight}px`
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
    })

    return(
        <Container fluid className="landing d-flex justify-content-center align-items-center">
            <LandingText/>
        </Container>
    )
}