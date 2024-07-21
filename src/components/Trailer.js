import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Youtube from 'react-youtube';

// Define the app element
Modal.setAppElement('#root'); // Assuming your root element has the id 'root'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

const Trailer = ({ location, movieId }) => {
    const [trailerView, setTrailerView] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    const showTrailer = () => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId || location?.state?.movie.id}/videos?api_key=ca2b7f32c8ca928800d73a65001f8723&language=en-US`)
            .then(res => res.json())
            .then(json => {
                console.log("Trailer View:", json.results);
                setTrailerView(json.results || []); // Ensure trailerView is an array, even if the API response is undefined
            })
            .catch(error => console.error("Error fetching trailer data:", error));
    };

    useEffect(() => {
        showTrailer();
    }, [location, movieId]);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Button variant='contained' sx={{ color: "black", backgroundColor: "white" }} onClick={openModal}>Play Trailer</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
                {/* <button onClick={closeModal}>close</button> */}
                {trailerView.length > 0 && <Youtube videoId={trailerView[0]?.key} />}
            </Modal>
        </div>
    );
};

export default Trailer;
