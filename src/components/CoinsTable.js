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
  Pagination,
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
    backgroundColor: "#16171a",
    "&:hover": {
      backgroundColor: "#131111",
    },
    cursor: "pointer",
  }),
  StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  });

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
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

  const handlePageChange = (val) => {
    setPage(val);
    window.scroll(0, 450);
  };

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
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
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
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
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

        <StyledPagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => handlePageChange(value)}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
