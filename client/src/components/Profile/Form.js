import React, { useEffect, useState } from "react";
import './Form.css'
import { Form, Button } from "react-bootstrap";
import { myaxios, refreshToken } from "../../Connections";
import { Redirect } from "react-router-dom";
import { useAlert } from 'react-alert'
import { WaveLoading } from 'react-loadingg';
export default function MyForm({setIsLoggedIn}) {

    
    const [done, setDone] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const alert = useAlert()
    useEffect(() => {
        const myform = document.getElementById("#myform")
        const uname = document.getElementById("#uname")
        const uc = document.getElementById("#uc")
        const degrees = document.getElementById("#degrees")
        const foi = document.getElementById("#foi")
        const skills = document.getElementById("#skills")
        const workedAt = document.getElementById("#workedAt")
        const gender = document.getElementById("#gender")
        const currentPosition = document.getElementById("#currentPosition")
        const instagram = document.getElementById("#instagram")
        const linkedin = document.getElementById("#linkedin")
        const github = document.getElementById("#github")
        const facebook = document.getElementById("#facebook")
        const bio = document.getElementById("#bio")
        const dp = document.getElementById("#dp")
        const firstName = document.getElementById("#firstName")
        const lastName = document.getElementById("#lastName")
        const removedp = document.getElementById("#removedp")
        const detailsArray = [uname, uc, degrees, foi, skills, workedAt, gender, currentPosition, instagram, linkedin, github, facebook, bio]
        const fieldsArray = ['uname', 'uc', 'degrees', 'foi', 'skills', 'workedAt', 'gender', 'currentPosition', 'instagram', 'linkedin', 'github', 'facebook', 'bio']
        const onButtonSubmit = async function(e) {
            e.preventDefault()
            setDone(true)
            try {
                if(dp.files[0]) {
                    if(dp.files[0].size > 10000000) {
                        return alert.show("File size too large!!!")
                    }
                    if(dp.files[0].type !== "image/jpg" && dp.files[0].type !== "image/jpeg" && dp.files[0].type !== "image/png") {
                        return alert.show("Please upload either a JPG or PNG or JPEG !!")
                    }
                    let formData = new FormData()
                    formData.append('avatar', dp.files[0])
                    // console.log(dp.files[0])
                    const ares = await myaxios.post('api/users/me/avatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    // console.log(ares)

                }
                
                const res1 = await myaxios({
                    method:"PATCH",
                    url: "api/users/me",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'firstName': firstName.value,
                        'lastName': lastName.value
                    }
                })

                // console.log(res1)

                const res = await myaxios({
                    method: "POST",
                    url: "api/users/me/details",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'uname': uname.value,
                        'uc': uc.value,
                        'degrees': degrees.value,
                        'foi': foi.value,
                        'skills': skills.value,
                        'workedAt': workedAt.value,
                        'gender': gender.value,
                        'currentPosition': currentPosition.value,
                        'instagram': instagram.value,
                        'linkedin': linkedin.value,
                        'github': github.value,
                        'facebook': facebook.value,
                        'bio': bio.value
                    }
                })
                // console.log(res)
                
                setSubmitted(true)
            } catch(er) {
                console.log(er.response.data.error)
                if(er.response.data.error === "jwt expired") {
                    refreshToken(onButtonSubmit, setIsLoggedIn)
                }
            }

        }

        const onRemoveDp = async function() {
            try {
                const res = await myaxios({
                    method: "DELETE",
                    url: "api/users/me/avatar"
                })
                // console.log(res)
            } catch(err) {
                console.log(err.response)
                if(err.response.data.error === "jwt expired") {
                    refreshToken(onRemoveDp, setIsLoggedIn)
                }
            }
        }

        removedp.addEventListener("click", onRemoveDp)
        
        const loadDetails = async function() {
            try {
                const res = await myaxios({
                    method: "GET",
                    url: "api/users/me/details"
                })
                // console.log(res)
                const data = res.data
                for(let i=0;i<fieldsArray.length;i++) {
                    if(data[fieldsArray[i]]) {
                        detailsArray[i].value = data[fieldsArray[i]]
                    }
                }

                const res1 = await myaxios({
                    method: "GET",
                    url: "api/users/me"
                })
                // console.log(res1)
                firstName.value = res1.data.firstName
                lastName.value = res1.data.lastName
                setLoaded(true)
            }catch(err) {
                console.log(err.response)
                if(err.response.data.error === "jwt expired") {
                    refreshToken(loadDetails, setIsLoggedIn)
                }
            }
        }
        loadDetails()
        myform.addEventListener('submit', onButtonSubmit)
    },[])
    

    if(loaded && done && submitted) {
        return <Redirect to="/technophiles"/>
    } 
    else if(loaded && done && !submitted) {
        return <WaveLoading/>
    }
    else {
        return(
            <div className="containerdiv">
                <div className="formdiv">
                    <Form id="#myform">
                        <div className="formheaders">
                            <h4>Education</h4>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>University Name</Form.Label>
                            <Form.Control type="text" placeholder="College Name" id="#uname"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicMonth" >
                            <Form.Label >University Completion</Form.Label>
                            <Form.Control type="month" id="#uc"/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Degree(s)</Form.Label>
                            <Form.Control type="text" placeholder="Ex: BTech in Computer Science" id="#degrees"/>
                            <Form.Text className="text-muted">(Separate with commas without space if multiple)</Form.Text>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Field of interest</Form.Label>
                            <Form.Control type="text" id="#foi"/>
                        </Form.Group>
                        <br/>
                        <div className="formheaders">
                            <h4>Experience</h4>
                        </div>
    
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Skill(s)<span className="myspan"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Ex: Skill-1,Skill-2,..." required id="#skills"/>
                            <Form.Text className="text-muted">(Separate with commas without space if multiple)</Form.Text>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Worked At</Form.Label>
                            <Form.Control type="text" placeholder="Ex: Company-1,Company-2,..." id="#workedAt"/>
                            <Form.Text className="text-muted">(Separate with commas without space if multiple)</Form.Text>
                        </Form.Group>
                        <br/>
                        <div className="formheaders">
                            <h4>Personal</h4>
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>First Name<span className="myspan"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="First Name" required id="#firstName"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Last Name<span className="myspan"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Last Name" required id="#lastName"/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Gender<span className="myspan"> *</span></Form.Label>
                            <Form.Control aria-label="Default select example" as="select" id="#gender" required>
                                {/* <option>Select</option> */}
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="pnts">prefer not to say</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Current Position<span className="myspan"> *</span></Form.Label>
                            <Form.Control type="text" placeholder="Ex: Developer, Manager" required id="#currentPosition"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicUrl" >
                            <Form.Label>Github<span className="myspan"> *</span></Form.Label>
                            <Form.Control type="url" required id="#github"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicUrl" >
                            <Form.Label>LinkedIn</Form.Label>
                            <Form.Control type="url" id="#linkedin"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicUrl" >
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control type="url" id="#instagram"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicUrl" >
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control type="url" id="#facebook"/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Introduce yourself to others<span className="myspan"> *</span></Form.Label>
                            <Form.Control as="textarea" rows={2} id="#bio" required/>
                        </Form.Group>
    
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Profile Image</Form.Label>
                            <br/>
                            <Form.Control type="file" id="#dp"/>
                            <br/>
                            <Form.Text className="text-muted" ><span style={{color:"red"}}>(Image size should be less than 10MB)</span></Form.Text>
                            <br/>
                            <Form.Text className="text-muted">(If already uploaded and do not want to update then no action is required)</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button variant="dark" id="#removedp">Remove Profile Image</Button>
                            <br/>
                            <Form.Text className="text-muted">(Only select if you want to remove a previously uploaded image)</Form.Text>
                        </Form.Group>
    
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}