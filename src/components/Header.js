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

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontWeight: "bold",
  cursor: "pointer",
});

const Header = () => {
  const [currency, setCurrency] = React.useState("");
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

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
              defaultValue={"USD"}
              onChange={handleCurrencyChange}>
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
