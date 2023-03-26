import React from "react";
import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import Carousel from "./Carousel";

const shineAnimation = keyframes`
  to {
    background-position: 200% center;
  }
`;

const StyledBanner = styled("div")({
    height: "100vh",
  }),
  StyledContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    justifyContent: "space-around",
  }),
  StyledTagline = styled("div")({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
  }),
  StyledTitle = styled(Typography)(({ theme }) => ({
    fontSize: "6.5rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 15,
    background:
      "linear-gradient(to right, #eebc1d 20%, #c88901 40%, #c88901 60%, #eebc1d 80%)",
    backgroundSize: "200% auto",
    backgroundClip: "text",
    textFillColor: "transparent",
    animation: `${shineAnimation} 3s linear infinite`,
    [theme.breakpoints.down("md")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  }));

const Banner = () => {
  return (
    <StyledBanner>
      <StyledContainer maxWidth={false}>
        <StyledTagline>
          <StyledTitle variant="h2">Crypto currencies</StyledTitle>
        </StyledTagline>

        <Container maxWidth={"lg"} style={{ marginTop: 50 }}>
          <Carousel />
        </Container>
      </StyledContainer>
    </StyledBanner>
  );
};

export default Banner;
