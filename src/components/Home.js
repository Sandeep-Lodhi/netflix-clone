import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from '../firebase/setup';

function Home() {
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

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        movies.forEach(movie => {
            addMovie(movie);
        });
    }, [movies]);

    const addMovie = async (movie) => {
        const movieRef = doc(database, "Movies", `${movie.id}`);
        try {
            await setDoc(movieRef, {
                movieName: movie.original_title
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: "#181818" }}>
            <Grid container spacing={2} style={{ paddingTop: "20px", paddingRight: "20px", paddingLeft: "20px" }}>
                {movies.map((movie) => (
                    <Grid item xs={3} key={movie.id}>
                        <Box>
                            <Link to="/movieDetail" state={{ movie: movie }}>
                                <Card>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                                        />
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Home;
