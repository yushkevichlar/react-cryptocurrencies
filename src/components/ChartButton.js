import React from "react";
import { styled } from "@mui/system";

const ChartButton = ({ children, selected, onClick }) => {
  const StyledButton = styled("span")({
    width: "22%",
    border: "1px solid gold",
    borderRadius: 5,
    margin: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
  });

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default ChartButton;
