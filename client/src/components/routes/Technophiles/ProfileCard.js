import React, { useEffect, useState } from 'react'
import {Card, Button} from 'react-bootstrap'
import './ProfileCard.css'
import Male from  './male.png'
import Female from './female.png'
import Pnts from './pnts.png'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { encodeBase64 } from 'bcryptjs'
export default function ProfileCard({uname, gender, details, id}) {
    const [dp, setDp] = useState(Pnts)
    useEffect(() => {
        if(details.avatar)
        {
            // const mybuffer = btoa(unescape(encodeURIComponent(new TextDecoder('utf-8').decode(new Uint8Array(details.avatar.data)))))
            const mybuffer = btoa(new Uint8Array(details.avatar.data).reduce(function (data, byte) {
                                    return data + String.fromCharCode(byte);
                             }, ''));
            return setDp(`data:image/png;base64,${mybuffer}`)
        }
        if(gender === 'female') {
            return setDp(Female)
        }
        if(gender === 'male') {
            return setDp(Male)
        }
    },[])

    return(
        <Card style={{ width: "18rem", color:"white", borderRadius:"10%" }} className="text-center profilecard" bg="dark">
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{width:"92px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{borderBottom:"1.5px solid coral", width:"100%", marginTop:"40px"}}>
                    </div>
                </div>
                <Card.Img as={Image} variant="top" src={dp} style={{borderRadius:"50%", width:"100px", height:"100px", border:"1.5px solid coral"}}/>
                <div style={{width:"92px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{borderBottom:"1.5px solid coral", width:"100%", marginTop:"40px"}}>

                    </div>
                </div>
            </div>
            <Card.Body>
                <Card.Title>{uname}</Card.Title>
                <Button as={Link} to={`/technophiles/${id}`} variant="primary">View Profile</Button>
            </Card.Body>
        </Card>
    )
}