import React, { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import Male from  './male.png'
import Female from './female.png'
import Pnts from './pnts.png'
import './FullProfileCard.css'
import { Image } from 'react-bootstrap'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function FullProfileCard({user}) {
    const [dp, setDp] = useState(Pnts)
    // const [uname, setUname] = useState("N/A")
    // const [uc, setUc] = useState("N/A")
    // const [degress, setDegrees] = useState("N/A")
    // const [foi, setFoi] = useState("N/A")
    const [skills, setSkills] = useState(null)
    // const [workedAt, setWorkedAt] = useState("N/A")
    // const [currentPosition, setCurrentPosition] = useState("N/A")
    useEffect(() => {
        if(user.details[0].avatar)
        {
            const mybuffer = btoa(String.fromCharCode.apply(null, new Uint8Array(user.details[0].avatar.data)))
            return setDp(`data:image/png;base64,${mybuffer}`)
        }
        if(user.details[0].gender === 'female') {
            return setDp(Female)
        }
        if(user.details[0].gender === 'male') {
            return setDp(Male)
        }

    },[])

    useEffect(() => {
        // if(user.details[0].uname) {
        //     setEducation({...user.details[0].uname})
        // }
        if(user.details[0].skills) {
            const myskills = user.details[0].skills
            const skillArray = myskills.split(",")
            let newSkills = ""
            skillArray.forEach((skill) => {
                return newSkills += `${skill}✓ `
            })
            setSkills(newSkills)
        }
    })

    return(
        <Card style={{ width: "50rem", color:"white", borderRadius:"4%" }} className="text-center fullprofilecard" bg="dark">
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{width:"18.75rem", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{borderBottom:"1.5px solid coral", width:"100%", marginTop:"60px"}}>
                    </div>
                </div>
                <Card.Img as={Image} variant="top" src={dp} style={{borderRadius:"50%", width:"12.5rem", height:"200px", border:"1.5px solid coral"}}/>
                <div style={{width:"18.75rem", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div style={{borderBottom:"1.5px solid coral", width:"100%", marginTop:"60px"}}>
                    </div>
                </div>
            </div>
            <Card.Body>
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", color:"white", marginTop:"40px", marginBottom:"40px"}}>
                    <Card style={{width: "360px", marginLeft:"10px", marginTop: "10px", marginBottom: "40px", marginRight:"40px"}} className="text-center subcard" bg="dark">
                        <Card.Title style={{fontWeight:"bold", borderBottom:"1px solid red"}}>Education</Card.Title>
                        {
                            user.details[0].uname ?
                                <Card.Text style={{margin:"7px"}}>{`University : ${user.details[0].uname}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>University : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        {
                            user.details[0].uc ? 
                                <Card.Text style={{margin:"7px"}}>{`Graduation : ${user.details[0].uc}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Graduation : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        {
                            user.details[0].degrees ? 
                                <Card.Text style={{margin:"7px"}}>{`Degrees : ${user.details[0].degrees}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Degrees : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        
                    </Card>
                    <Card style={{width: "360px", margin:"10px"}} className="text-center subcard" bg="dark">
                        <Card.Title style={{fontWeight:"bold", borderBottom:"1px solid red"}}>Experience</Card.Title>
                        {
                            skills ? 
                                
                                <Card.Text style={{margin:"7px"}}>Skills : <span style={{color:"greenyellow"}}>{skills}</span></Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Skills : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        {
                            user.details[0].workedAt ? 
                                <Card.Text style={{margin:"7px"}}>{`Worked At : ${user.details[0].workedAt}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Worked At : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        {
                            user.details[0].foi ? 
                                <Card.Text style={{margin:"7px"}}>{`Field of Interest : ${user.details[0].foi}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Field of Interest : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                    </Card>
                    <Card style={{width: "360px", margin:"10px"}} className="text-center subcard" bg="dark">
                        <Card.Title style={{fontWeight:"bold", borderBottom:"1px solid red"}}>About Me</Card.Title>
                        {
                            user.details[0].currentPosition ? 
                                <Card.Text style={{margin:"7px"}}>{`Current Position : ${user.details[0].currentPosition}`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Current Position : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                        {
                            user.details[0].bio ? 
                                <Card.Text style={{margin:"7px"}}>{`Bio : "${user.details[0].bio}"`}</Card.Text>
                            :
                                <Card.Text style={{margin:"7px"}}>Bio : <span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                        }
                    </Card>
                    <Card style={{width: "360px", margin:"10px", marginTop: "40px"}} className="text-center subcard" bg="dark">
                        <Card.Title style={{fontWeight:"bold", borderBottom:"1px solid red", marginBottom:"20px"}}>Social</Card.Title>
                        {
                            (!user.details[0].github && !user.details[0].linkedin && !user.details[0].facebook && !user.details[0].instagram) ?
                                <Card.Text style={{margin:"7px"}}><span style={{color:"lightgrey"}}>N/A</span></Card.Text>
                            :

                            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                                {
                                    user.details[0].github ? 
                                        <Card.Link href={user.details[0].github} target="_blank" style={{textDecoration: "none", width:"25px", margin:"10px"}}>{<GitHubIcon color="primary"/>}</Card.Link>
                                    :
                                        null
                                }
                                {
                                    user.details[0].linkedin ? 
                                        <Card.Link href={user.details[0].linkedin} target="_blank" style={{textDecoration: "none", width:"25px", margin:"10px"}}>{<LinkedInIcon color="primary"/>}</Card.Link>
                                    :
                                        null
                                }
                                {
                                    user.details[0].facebook ? 
                                        <Card.Link href={user.details[0].facebook} target="_blank" style={{textDecoration: "none", width:"25px", margin:"10px"}}>{<FacebookIcon color="primary"/>}</Card.Link>
                                    :
                                        null
                                }
                                {
                                    user.details[0].instagram ? 
                                        <Card.Link href={user.details[0].instagram} target="_blank" style={{textDecoration: "none", width:"25px", margin:"10px"}}>{<InstagramIcon color="primary"/>}</Card.Link>
                                    :
                                        null
                                }

                            </div>
                        }
                    </Card>
                </div>
            </Card.Body>
        </Card>
    )
}