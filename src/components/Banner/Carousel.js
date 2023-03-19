import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { styled } from "@mui/system";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const StyledCarousel = styled("div")({
    height: "50%",
    display: "flex",
    alignItems: "center",
  }),
  StyledLink = styled(Link)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "#ffffff",
  });

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const carouselItems = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <StyledLink to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "#0cbd78" : "#ec0f24",
              fontWeight: "bold",
            }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: "bold" }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </StyledLink>
    );
  });

  const responsiveCarousel = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <StyledCarousel>
      <AliceCarousel
        mouseTracking
        autoPlay
        infinite
        disableDotsControls
        disableButtonsControls
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsiveCarousel}
        items={carouselItems}
      />
    </StyledCarousel>
  );
};

export default Carousel;
