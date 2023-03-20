import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { styled } from "@mui/system";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

const StyledContainer = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  })),
  StyledSidebar = styled("div")(({ theme }) => ({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  })),
  StyledHeader = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20,
  }),
  StyledDescription = styled(Typography)({
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  }),
  StyledMarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 5,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("sxs")]: {
      alignItems: "start",
    },
  }));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <StyledContainer>
      <StyledSidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <StyledHeader variant="h3">{coin?.name}</StyledHeader>

        <StyledDescription variant="subtitle1">
          {parse(coin?.description.en.split(". ")[0])}
        </StyledDescription>

        <StyledMarketData>
          <span style={{ display: "flex" }}>
            <StyledHeader variant="h5">Rank:</StyledHeader>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
        </StyledMarketData>

        <StyledMarketData>
          <span style={{ display: "flex" }}>
            <StyledHeader variant="h5">Current Price:</StyledHeader>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </StyledMarketData>

        <StyledMarketData>
          <span style={{ display: "flex" }}>
            <StyledHeader variant="h5">Market Cap: </StyledHeader>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </StyledMarketData>
      </StyledSidebar>

      <CoinInfo coin={coin} />
    </StyledContainer>
  );
};

export default CoinPage;
