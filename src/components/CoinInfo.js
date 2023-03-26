import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { chartDays } from "../config/data";
import ChartButton from "./ChartButton";

Chart.register(...registerables);

const StyledContainer = styled("div")(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
      flexDirection: "column",
      alignItems: "center",
    },
  })),
  StyledPeriodsWrapper = styled("div")({
    width: "100%",
    display: "flex",
    marginTop: 20,
    justifyContent: "space-around",
  });

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const mappedChartDays = chartDays.map((day) => (
    <ChartButton
      key={day.value}
      selected={day.value === days}
      onClick={() => setDays(day.value)}>
      {day.label}
    </ChartButton>
  ));

  const getDatasets = () => {
    return {
      data: historicData.map((coin) => coin[1]),
      label: `Price (past ${days} days) in ${currency}`,
      borderColor: "#eebc1d",
    };
  };

  const getLabelsData = () => {
    return historicData.map((coin) => {
      let date = new Date(coin[0]),
        time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    });
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: getLabelsData(),
                datasets: [getDatasets()],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <StyledPeriodsWrapper>{mappedChartDays}</StyledPeriodsWrapper>
          </>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
