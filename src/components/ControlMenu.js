import React from "react";
import { useEffect } from "react";

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  useEffect(() => {
    console.log("AAA");
  }, []);
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});
export default ControlMenu;
