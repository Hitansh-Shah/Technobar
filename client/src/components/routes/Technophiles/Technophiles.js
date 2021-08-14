import React, { useEffect, useState } from 'react'
import { myaxios } from '../../../Connections'
import { LoopCircleLoading } from 'react-loadingg';
import ProfileCard from './ProfileCard';
import { Container } from 'react-bootstrap';
import Zoom from 'react-reveal/Zoom';
import config from 'react-reveal/globals';
config({ ssrFadeout: true });

export default function Technophiles() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async function() {
            try {
                const res = await myaxios({
                    method: 'get',
                    url: 'api/users'
                })
                // console.log(res)
                setUsers(res.data)
                // console.log(users)
            } catch (error) {
                console.log(error.response)
            }
        }
        let mounted = true
        if(mounted) {
            getUsers()
        }
        return () => mounted = false
    },[])
    const UserList = function() {
        return(
            <div style={{display:"flex", flexWrap:"wrap", marginTop:"100px", justifyContent:"center"}}>
                <Zoom>
                    {
                        users.map((user,i) => {
                            return(
                                <ProfileCard uname={user.firstName + " " + user.lastName} gender={user.details.gender} key={i} id={user._id} details={user.details}/>
                            )
                        })
                    }
                </Zoom>
            </div>
        )
    }
    // const users = getUsers()
    // console.log(users)
    if(users.length > 0) {
        return(
            <Container className="justify-content-center">
                <UserList/>
            </Container>
        )
    } else {
        return (
            <div>
                <LoopCircleLoading/>
            </div>
        )
    }
}