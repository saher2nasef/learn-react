import React, { useContext } from "react";
import { AppDataContext } from "./AppData/App.Data";

const AppChildren = ({ children }) => {
  let { Data } = useContext(AppDataContext);
  return <div className={Data["Theme"]}>{children}</div>;
};

export default AppChildren;
