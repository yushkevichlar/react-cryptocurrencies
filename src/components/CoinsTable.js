import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { numberWithCommas } from "./Banner/Carousel";

const StyledTableRow = styled(TableRow)({
  flex: 1,
  color: "gold",
  fontWeight: "bold",
  cursor: "pointer",
});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const { currency, symbol } = CryptoState();

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    if (search) {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    } else return coins;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          variant="outlined"
          label="Search for a cryptocurrency..."
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "center" : "right"}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <StyledTableRow
                      key={row.name}
                      onClick={() => navigate(`/coins/${row.id}`)}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", gap: 15 }}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "#0cbd78" : "#ec0f24",
                          fontWeight: 500,
                        }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
