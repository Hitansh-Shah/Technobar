import React, { useEffect, useState } from 'react'
import { myaxios } from '../../../Connections'
import { LoopCircleLoading } from 'react-loadingg';
import { useParams } from 'react-router-dom';
import FullProfileCard from './FullProfileCard';
import { Container } from 'react-bootstrap';
export default function DetailProfile() {
    const [user, setUser] = useState(null)
    const {id} = useParams()
    const getUser = async function() {
        // console.log(id)
        try {
            const res = await myaxios({
                method: "GET",
                url: `/api/users/profile/${id}`,
            })
            setUser(res.data)
            // console.log(res)
        } catch (err) {
            console.log(err.response)
        }
    }
    useEffect(() => {
        let mounted = true
        if(mounted) {
            getUser()
        }
        return () => mounted = false
    },[])

    if(user) {
        return(
            <Container className="justify-content-center">
                <div style={{display:"flex", justifyContent:"center", marginTop:"50px", marginBottom:"50px"}}>
                    <FullProfileCard user={user}/>
                </div>
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