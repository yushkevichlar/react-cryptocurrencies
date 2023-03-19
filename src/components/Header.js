import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CryptoState } from "../CryptoContext";

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontWeight: "bold",
  cursor: "pointer",
});

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <StyledTypography onClick={() => navigate("/")}>
              💰🤑💰
            </StyledTypography>

            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              defaultValue={"USD"}
              onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
