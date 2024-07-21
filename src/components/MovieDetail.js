import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { addDoc, collection, doc, getDocs } from "firebase/firestore"
import { auth, database } from '../firebase/setup';
import Trailer from './Trailer';
import { toast } from 'react-toastify';

function MovieDetail() {
    const [review, setReview] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const location = useLocation();

    const moviewRef = doc(database, "Movies", `${location.state?.movie?.id}`);
    const reviewRef = collection(moviewRef, "Reviews");

    const addReview = async () => {
        try {
            if (!auth.currentUser) {
                toast.warning("Please login");
                return;
            }
            await addDoc(reviewRef, {
                movieReview: review,
                email: auth.currentUser?.email,
                username: auth.currentUser?.displayName,
                profile_image: auth.currentUser?.photoURL
            });
            toast.success("Review added successfully", { theme: "dark" });
        } catch (error) {
            console.error("Error adding review:", error);
        }
    }

    const showReview = async () => {
        try {
            const data = await getDocs(reviewRef);
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setReviewData(filteredData);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        showReview();
    }, [location]);

    return (
        <div style={{ backgroundColor: "black", height: "100%" }}>
            <Grid container>
                <Grid item xs={8}>
                    <div style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state?.movie?.poster_path})`,
                        height: "100vh",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}>
                        <div style={{ paddingTop: "150px", paddingLeft: "30px", paddingRight: "10px", fontFamily: "initial" }}>

                            <h1 style={{ color: "red", fontSize: "50px" }}>{location.state?.movie?.original_title}</h1>

                            <div style={{ display: "flex" }}>
                                <h4 style={{ color: "white" }}> Language: {location.state?.movie?.original_language} - </h4>
                                <h4 style={{ color: "white" }}> Release Date : {location.state?.movie?.release_date}</h4>
                            </div>

                            <h2 style={{ color: "white", fontWeight: "100" }}>{location.state?.movie?.overview}</h2>

                            <Trailer location={location} />

                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ backgroundColor: "black", padding: "20px" }}>
                        <Grid container>
                            <div>
                                <h5 style={{ color: "#AAAAAA", fontWeight: "100" }}>ADD REVIEW</h5>
                                <TextField
                                    onChange={(e) => setReview(e.target.value)}
                                    size='small'
                                    label='Review'
                                    variant='outlined'
                                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                                />
                                <Button
                                    onClick={addReview}
                                    sx={{ ml: "10px", bgcolor: "red", color: "white" }}
                                    variant='contained'
                                >
                                    Submit
                                </Button>
                            </div>
                        </Grid>

                        <div style={{ paddingTop: "10px" }}>
                            {reviewData.map(each => (
                                <React.Fragment key={each.id}>
                                    <div style={{ display: "flex" }}>
                                        <img
                                            style={{ width: "20px", height: "20px", borderRadius: "50%", marginTop: "12px" }}
                                            src={each.profile_image}
                                            alt='Profile image'
                                        />
                                        <li style={{ color: "gray", padding: "10px", paddingLeft: "10px" }}>
                                            {each.username}
                                        </li>
                                    </div>
                                    <h6 style={{ color: "gray" }}>{each.movieReview}</h6>
                                </React.Fragment>
                            ))}
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default MovieDetail;
