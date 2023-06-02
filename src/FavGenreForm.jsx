import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Form({ updateGenreData }) {
    const { personId } = useParams();

    const [genre, setGenre] = React.useState('');
    const GET_GENRE = "https://localhost:7130/api/Genres/GetGenres";
    const [genreData, setGenreData] = React.useState([]);

    const GET_P_FAVGENRE = `https://localhost:7130/api/FavGenre/GetGenresByPersonId/${personId}`;

    const handleGenreChange = (evt) => {
        console.log(evt.target.value);
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
            .post(`https://localhost:7130/api/FavGenre/AddFavGenre/${personId}/${genre}`)
            .then((res) => {
                console.log('Posting data:', res);

                axios(GET_P_FAVGENRE)
                    .then((favGenreResult) => {
                        const newGenreData = favGenreResult.data;
                        updateGenreData(newGenreData);
                    })
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Add a new favorite genre
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
    );
}

export default Form;
