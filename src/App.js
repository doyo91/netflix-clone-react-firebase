import React from "react";
import styled from "styled-components";
import requests from "./services/requests";

import { Row } from "./components/Row";
import { Banner } from "./components/Banner";
import { NavBar } from "./components/NavBar";

const AppStyled = styled.div``;

function App() {
  return (
    <AppStyled className="App">
      <NavBar />
      {/* Header */}
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Moives" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </AppStyled>
  );
}

export default App;
