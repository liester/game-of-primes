import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const FooterStyled = styled.div`
  padding: 1em;
`;
const Footer = props => {
  return (
    <FooterStyled>
      {props.hasEnded && (
        <div>
          <Button
            variant={`contained`}
            color="primary"
            onClick={props.resetGame}
          >
            Play Again
          </Button>
        </div>
      )}
    </FooterStyled>
  );
};

export default Footer;
