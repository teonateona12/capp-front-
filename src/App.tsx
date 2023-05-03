import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    const getItemsList = async () => {
      const res = await axios.get("http://localhost:3001/api/getdata");
      setData(res.data);
    };
    getItemsList();
  }, [data]);
  return <></>;
}

export default App;
