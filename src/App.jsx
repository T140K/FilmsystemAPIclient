import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import PersonList from './PersonList';
import FavGenreForm from './FavGenreForm';
import MovieReviewForm from './MovieReviewForm';
import AddMovieForm from './AddMovieForm';

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
`;

const NavBar = styled.nav`
  border-bottom: 1px solid black;
  display: flex;
`;

const FavGenre = styled.nav`
  margin-left: 2em;
`;



function Person() {
  const [genreData, setGenreData] = React.useState(false);
  const [personData, setPersonData] = React.useState(false);
  const [reiviewData, setReviewData] = React.useState(false);
  const [movieData, setMovieData] = React.useState(false);

  let { personId } = useParams();
  
  const GET_P_FAVGENRE = `https://localhost:7130/api/FavGenre/GetGenresByPersonId/${personId}`;
  const GET_PEPOPLE = `https://localhost:7130/api/Person/GetPersonById/${personId}`;
  const GET_REVIEW = `https://localhost:7130/api/MovieReview/GetReviewByPersonId/${personId}`;
  const GET_PUBLISHED_MOVIES = `https://localhost:7130/api/Movie/GetMovieByPersonId/${personId}`;

  const updateGenreData = (newGenreData) => {
    setGenreData(newGenreData);
  };

  const updateMovieReviewData = (newMovieReviewData) => {
    setReviewData(newMovieReviewData);
  };

  const updateMoviesData = (newupdateMoviesData) => {
    setMovieData(newupdateMoviesData);
  };
  

  React.useEffect(() => {
    const fetchData = async () => {
      const favGenreResult = await axios(GET_P_FAVGENRE);
      const personResult = await axios(GET_PEPOPLE);
      const reviewResult = await axios(GET_REVIEW);
      const movieResult = await axios(GET_PUBLISHED_MOVIES);

      setGenreData(favGenreResult.data);
      setPersonData(personResult.data);
      setReviewData(reviewResult.data);
      setMovieData(movieResult.data);
    };

    fetchData();
    
  }, []);

  return genreData && personData && reiviewData && movieData ? (
    <>
      <div>{ }</div>
      {personData.map((person) => (
        <div key={person.id}>
          <h2>{person.firstName}'s favourite genres:</h2>
          {genreData.map((genre) => (
            <div key={genre.id}>
              <h5>{genre.name} - {genre.description}</h5>
            </div>
          ))}

          <FavGenreForm updateGenreData={updateGenreData}/>

          <h2>{person.firstName}'s movie reviews:</h2>
          {reiviewData.map((rating) => (
            <div key={rating.id}>
              <h4>{rating.movieName} - {rating.rating}/10</h4>
              <h5>Their thoughts: {rating.review}</h5>
            </div>
          ))}

          <MovieReviewForm updateMovieReviewData={updateMovieReviewData}/>

          <h2>{person.firstName}'s published movies:</h2>
          {movieData.map((movies) => (
            <div>
              <h4>{movies.name} - {movies.link}</h4>
              <h4>Genres: {movies.movieGenre}</h4> {/* didnt think through genres for a movies
            in my db */}
            </div>
          ))}

          <AddMovieForm updateMoviesData={updateMoviesData}/>
        </div>
      ))}
    </>
  ) : (
    <h3>Loading data for user</h3>
  );
}

function Persons() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:personId`}>
          <Person />
        </Route>
        <Route path={match.path}>
          <h3>Go back and select a person</h3>
        </Route>
      </Switch>
    </>
  )
}

function App() {

  return (
    <Router>
      <MainContainer>
        <NavBar>
          <h1>hello</h1>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/person">About</Link>
            </li>
          </ul>

        </NavBar>
        <Switch>
          <Route path="/person">
            <Persons />
          </Route>
          <Route path="/">
            <PersonList />
          </Route>
        </Switch>

      </MainContainer>
    </Router>
  );
};

export default App
