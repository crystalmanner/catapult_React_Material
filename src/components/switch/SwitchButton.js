import React from 'react';

const SwitchButton = ({ checked, onChange }) => {
  return (
    <label>
      <input
        checked={checked}
        onChange={onChange}
        className="switch"
        type="checkbox"
      />
      <div>
        <span className="leftTag">Light</span>
        <span className="rightTag">Dark</span>
        <div className="moveBtn">{checked ? 'Dark' : 'Light'}</div>
      </div>
    </label>
  );
};
export default SwitchButton;
