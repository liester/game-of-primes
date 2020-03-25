import React from "react";
import { DIFFICULTY } from "./utils";
import styled, { css } from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const HeaderContent = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
`;

const Header = props => {
  return (
    <div style={{ width: `100%` }}>
      <HeaderContent>
        <div>High Score: 0</div>
        <Select
          style={{ color: `white` }}
          value={props.difficulty}
          onChange={props.setDifficulty}
        >
          {Object.values(DIFFICULTY).map(key => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </HeaderContent>
    </div>
  );
};

export default Header;
