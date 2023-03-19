import React from "react";
import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const StyledBanner = styled("div")({
    backgroundImage: "url(./banner2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
  }),
  StyledContainer = styled(Container)({
    height: 400,
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
  }),
  StyledTitle = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 15,
  }),
  StyledSubtitle = styled(Typography)({
    color: "darkgrey",
    textTransform: "capitalize",
  });

const Banner = () => {
  return (
    <StyledBanner>
      <StyledContainer>
        <StyledTagline>
          <StyledTitle variant="h2">Crypto currencies</StyledTitle>
          <StyledSubtitle variant="subtitle2">
            Get all the information you need about your favorite crypto currency
          </StyledSubtitle>
        </StyledTagline>

        <Carousel />
      </StyledContainer>
    </StyledBanner>
  );
};

export default Banner;
