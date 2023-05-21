import * as React from 'react';
import styled from 'styled-components';
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

function Person() {
  let { personId } = useParams();

  return <h3>Requested person ID: {personId}</h3>;
}

function Persons() {
  let match = useRouteMatch();

  return (
    <>
      <h1>person!</h1>

      <Switch>
        <Route path={`${match.path}/:personId`}>
          <Person />
        </Route>
        <Route path={match.path}>
          <h3>Go back and click a movie</h3>
        </Route>
      </Switch>
    </>
  )
}

function App() {

  return (
    <Router>
      <MainContainer>

        <h1>hello</h1>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/person">About</Link>
          </li>
        </ul>

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
