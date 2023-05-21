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

const MainContainer = styled.main`
  width: 100vh;
  height: 100vh;
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
  console.log(genreData)

  let { personId } = useParams();
  const GET_P_FAVGENRE = `https://localhost:7130/api/FavGenre/GetGenresByPersonId/${personId}`;
  const GET_P = `https://localhost:7130/api/Person/GetPersonById/${personId}`;
  React.useEffect(() => {
    const fetchData = async () => {
      const favGenreResult = await axios(GET_P_FAVGENRE);
      const personResult = await axios(GET_P);
      console.log(favGenreResult);
      //console.log(personResult);
      setGenreData(favGenreResult.data);
      setPersonData(personResult.data);
      console.log(personResult)
    };

    fetchData();
  }, []);

  return genreData && personData ? (
    <>
        {personData.map((person) => (
          <div key={person.id}>
            <h2>{person.firstName}'s favourite genres:</h2>
          </div>
        ))}
        
        {genreData.map((genre) => (
          <div key={genre.id}>
            <h5>{genre.name} - {genre.description}</h5>
          </div>
        ))}
    </>
  ) : (
    <h3>Loading data for id: {personId}</h3>
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
