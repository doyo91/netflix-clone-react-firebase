import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NavBarStyled = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  transition-timing-function: ease-in;
  transition: all 0.5s;

  &.nav--black {
    background-color: #111;
  }

  .nav__logo {
    position: fixed;
    left: 20px;
    width: 80px;
    object-fit: contain;
  }

  .nav__avatar {
    position: fixed;
    right: 20px;
    width: 30px;
    object-fit: contain;
  }
`;

export const NavBar = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <NavBarStyled className={`nav ${show && "nav--black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        className="nav__logo"
      />
      <img
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Avatar Logo"
        className="nav__avatar"
      />
    </NavBarStyled>
  );
};
