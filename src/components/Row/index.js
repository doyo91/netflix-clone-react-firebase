import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../../services/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const RowStyled = styled.section`
  margin-left: 20px;
  color: white;
  .row__posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .row__poster {
    object-fit: contain;
    width: 100%;
    height: 150px;
    margin-right: 10px;
    transition: transform 450ms;

    &:hover {
      transform: scale(1.08);
    }
  }

  .row__posterLarge {
    height: 350px;
    &:hover {
      transform: scale(1.09);
    }
  }
`;

const base_url = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  //   console.table(movies); Organiza en tablas

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || "")
        .then((url) => {
          // https://youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    console.log(movie?.name);
    console.log(movie);
  };

  return (
    <RowStyled className="row">
      <h2>{title}</h2>
      <article className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            onClick={() => handleClick(movie)}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </article>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </RowStyled>
  );
};
