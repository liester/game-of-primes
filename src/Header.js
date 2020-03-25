import React from "react";
import { DIFFICULTY } from "./utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = {
  padding: `1em`,
  display: `flex`,
  justifyContent: `space-between`
};

const Header = props => {
  return (
    <div style={{ width: `100%` }}>
      <div style={styles}>
        <div>High Score: {props.highScore}</div>
        <Select
          style={{ color: `white` }}
          value={props.difficulty}
          onChange={event => {
            props.setDifficulty(event.target.value);
          }}
        >
          {Object.values(DIFFICULTY).map(key => {
            return (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default Header;
