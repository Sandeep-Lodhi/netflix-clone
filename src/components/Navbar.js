import React, { useEffect, useState } from 'react'
import netflix from "../images/netflix.png"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/setup';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';

function Navbar() {
    const navigate  = useNavigate()
    const logout = async() =>{
        try {
            
            await signOut(auth)
            toast.success("Loggrdout Successfully",{
                theme:"dark"
        })
            
        } catch (err) {
            console.log(err)
            

        }
    }
    // const navigate  = useNavigate()
    const [movies, setMovies] = useState([]);

    const getMovies = () => {
        try {
            fetch(
                "https://api.themoviedb.org/3/discover/movie?api_key=ca2b7f32c8ca928800d73a65001f8723"
            )
                .then((res) => res.json())
                .then((json) => setMovies(json.results)); // Update movies state here
        } catch (err) {
            console.error(err);
        }
    };

     const signinClick = () =>{
        navigate("/signin")
     }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[6]?.poster_path})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "520px", width: "100%" }}>
            <ToastContainer autoClose={2000}/>
            <div style={{display:"flex", justifyContent:"space-between", padding:"20px"}}>
                <img style={{ width:"90px",height:"90px"}} src={netflix} alt='netlix logo'/>
                <div>
                {auth.currentUser?.emailVerified?<Button onClick={logout} color="error" variant="contained" sx={{height:"40px", marginLeft:"10px"}}>Logout</Button>
                :<Button onClick={signinClick} color="error" variant="contained" sx={{height:"40px"}}>SignIn</Button>}
                
                </div>
            </div>
            <div style={{padding:"20px"}}>
                <h2 style={{color:"#F1F1F1",fontSize:"70px",fontFamily:"initial"}}>{movies[6]?.original_title}</h2>
                <h3 style={{color:"#F1F1F1"}}>{movies[6]?.overview}</h3>
            </div>
            {/* <Button  variant='contained' sx={{color:"black",bgcolor:"white", fontWeight:"bold"}}>View Trailer</Button> */}
            <Trailer />
        </div>
    )
}

export default Navbar