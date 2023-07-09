import React, { useContext } from "react";
import "./HomePageStyle.css";
import { AppDataContext } from "../../AppData/App.Data";
const HomePage = () => {
  let Data = useContext(AppDataContext);
  let AppName = Data.Data.AppName;
  return (
    <section id="HomePage">
      <h2>Welcome In {AppName}</h2>
    </section>
  );
};

export default HomePage;
