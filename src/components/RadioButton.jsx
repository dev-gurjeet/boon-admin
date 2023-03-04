import React from "react";

const RadioButton = ({ checked, onClick, id }) => {
  return (
    <div className="custom-switch">
      <input
        type="checkbox"
        id="switch"
        checked={checked}
        onClick={() => onClick(id, checked)}
      />
      <label for="switch">Toggle</label>
    </div>
  );
};

export default RadioButton;
