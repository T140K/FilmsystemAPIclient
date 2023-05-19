import * as React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";

import PersonList from './PersonList';

const MainContainer = styled.main`
  width: 100vh;
  height: 100vh;
`;

function App() {
  
  return (
    <MainContainer>
      <h1>hello</h1>
        <PersonList/>
    </MainContainer>
    
  );
};

export default App
