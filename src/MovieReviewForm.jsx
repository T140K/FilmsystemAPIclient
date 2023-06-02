import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieReviewForm({ updateMovieReviewData }) {
    const { personId } = useParams();
    const [movieData, setReviewData] = React.useState([]);
    const [movie, setMovie] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [review, setReview] = React.useState('');

    const GET_REVIEW = `https://localhost:7130/api/MovieReview/GetReviewByPersonId/${personId}`;

    const handleMovieChange = (evt) => {
        console.log(evt.target.value);
        setMovie(evt.target.value);
    }

    const handleReviewChange = (evt) => {
        setReview(evt.target.value);
    };

    const handleRatingChange = (evt) => {
        console.log(evt.target.value);
        setRating(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const movieReviewsResult = await axios(`https://localhost:7130/api/Movie/GetAllMovies`);
                console.log(movieReviewsResult);
                setReviewData(movieReviewsResult.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchData();
    }, []);

    const postData = (e) => {
        e.preventDefault();

        axios
            .post(`https://localhost:7130/api/MovieReview/AddMovieReview/${personId}/${movie}/${rating}/${review}`)
            .then((res) => {
                console.log('Posting data:', res);

                axios(GET_REVIEW)
                    .then((reviewResult) => {
                        const newReviewData = reviewResult.data;
                        updateMovieReviewData(newReviewData);
                    })
            })
            .catch((err) => console.log(err));
    };

    const ratingArr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Add a new movie reivew:
                    <select value={movie} onChange={handleMovieChange}>
                        <option value=""> - Please select a movie -</option>
                        {movieData.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.name}
                            </option>
                        ))}
                    </select>

                    <select value={rating} onChange={handleRatingChange}>
                        <option value=""> - Select a rating -</option>
                        {ratingArr.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>

                    Review
                    <label>
                        <input
                            type="text"
                            value={review}
                            onChange={handleReviewChange}
                        />
                    </label>
                </label>

                <button onClick={postData} type="submit">SEND</button>
            </form>
        </>
    )
}

export default MovieReviewForm;