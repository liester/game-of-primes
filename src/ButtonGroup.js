import React from "react";
import styled, { css } from "styled-components";

const StyledButtonGroup = styled.div`
  button.left {
    border-radius: 2px 0px 0px 2px;
  }
  button.right {
    color: blue;
  }
`;

const ButtonGroup = props => {
  return <StyledButtonGroup>{props.children}</StyledButtonGroup>;
};

export default ButtonGroup;
