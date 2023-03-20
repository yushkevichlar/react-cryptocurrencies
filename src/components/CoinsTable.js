import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { styled, Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

const StyledTextField = styled(TextField)({
    marginBottom: 20,
    width: "100%",
    fontSize: 18,
    fontFamily: "'Space Grotesk', sans-serif",
    "& .MuiFormLabel-root": {
      fontSize: 20,
      color: "darkgrey",
    },
    "& label.Mui-focused": {
      color: "#c88901",
    },
    "& .MuiOutlinedInput-root": {
      "& .Mui-focused fieldset": {
        borderColor: "#c88901",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c88901",
      },
      "&:hover fieldset": {
        borderColor: "#c88901",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c88901",
      },
    },
  }),
  StyledTableRow = styled(TableRow)({
    backgroundColor: "#16171a",
    "&:hover": {
      backgroundColor: "#131111",
    },
    cursor: "pointer",
  }),
  StyledTableCell = styled(TableCell)({
    fontFamily: "'Space Grotesk', sans-serif",
  }),
  StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      color: "#c88901",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 22,
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
    window.scrollTo({
      top: window.pageYOffset - 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    if (search) setPage(1);
  }, [search]);

  const handleSearch = () => {
    if (search) {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    } else return coins;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          style={{ margin: 18, fontFamily: "'Space Grotesk', sans-serif" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <StyledTextField
          variant="outlined"
          label="Search for a cryptocurrency..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#c88901" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <StyledTableCell
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: 20,
                      }}
                      key={head}
                      align={head === "Coin" ? "center" : "right"}>
                      {head}
                    </StyledTableCell>
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
                        <StyledTableCell
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
                                fontSize: 28,
                              }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey", fontSize: 20 }}>
                              {row.name}
                            </span>
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "#0cbd78" : "#ec0f24",
                            fontWeight: 500,
                            fontSize: 18,
                          }}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>

                        <StyledTableCell align="right" style={{ fontSize: 18 }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </StyledTableCell>

                        <StyledTableCell align="right" style={{ fontSize: 18 }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </StyledTableCell>
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
