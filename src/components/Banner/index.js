import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../../services/axios";
import requests from "../../services/requests";

const BannerStyled = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;
  position: relative;
  margin-bottom: 3rem;

  .banner__contents {
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
  }

  .banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }

  .banner__description {
    width: 45rem;
    line-height: 1.3;
    font-size: 0.8rem;
    padding-top: 1rem;
    max-width: 360px;
    height: 80px;
  }

  .banner__button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 0.5rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    background: rgba(51, 51, 51, 0.5);

    &:hover {
      color: #000;
      background-color: #e6e6e6;
      transition: all 0.2s;
    }
  }

  .banner--fadeBottom {
    height: 7.4rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
`;

export const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.round(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <BannerStyled
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center / center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </BannerStyled>
  );
};
