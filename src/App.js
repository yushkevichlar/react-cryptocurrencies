import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "@mui/system";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import Homepage from "./pages/Homepage";
import "./App.css";

const WrapperDiv = styled("div")({
  backgroundColor: "#14161a",
  color: "#ffffff",
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
      <WrapperDiv>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" component={<CoinPage />} />
        </Routes>
      </WrapperDiv>
    </BrowserRouter>
  );
}

export default App;
