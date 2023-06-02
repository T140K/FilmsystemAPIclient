import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddMovieForm({ updateMoviesData }) {
    let { personId } = useParams();

    const [movieName, setMovieName] = React.useState('');
    const [movieLink, setMovieLink] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [genreData, setGenreData] = React.useState([]);

    const POST_NEWMOVIE = `https://localhost:7130/api/Movie/AddNewMovie/${movieName}/${movieLink}/${genre}/${personId}`;
    const GET_PUBLISHED_MOVIES = `https://localhost:7130/api/Movie/GetMovieByPersonId/${personId}`;
    const GET_GENRE = "https://localhost:7130/api/Genres/GetGenres";

    const handleNameChange = (evt) => {
        setMovieName(evt.target.value);
    };
    const handleLinkChange = (evt) => {
        setMovieLink(evt.target.value);
    };
    const handleGenreChange = (evt) => {
        setGenre(evt.target.value);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt);
    };


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const genreResult = await axios(GET_GENRE);
                console.log(genreResult);
                setGenreData(genreResult.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchData();
    }, []);

    const postData = (e) => {
        e.preventDefault();

        axios
            .post(`https://localhost:7130/api/Movie/AddNewMovie/${movieName}/${movieLink}/${genre}/${personId}`)
            .then((res) => {
                console.log('Posting data:', res);

                axios(GET_PUBLISHED_MOVIES)
                    .then((movieResult) => {
                        const newMovieData = movieResult.data;
                        updateMoviesData(newMovieData);
                    })
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                Add a new movie:
                <label>
                    <input
                        placeholder='movie name'
                        type="text"
                        value={movieName}
                        onChange={handleNameChange}
                    />

                    movie link:
                    <input
                        placeholder='movie link'
                        type="text"
                        value={movieLink}
                        onChange={handleLinkChange}
                    />

                    movie genre
                    <select value={genre} onChange={handleGenreChange}>
                        <option value=""> - Please select a genre -</option>
                        {genreData.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button onClick={postData} type="submit">SEND</button>
            </form>
        </>
    )
}

export default AddMovieForm