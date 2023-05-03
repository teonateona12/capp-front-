import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const getItemsList = async () => {
      const res = await axios.get("http://localhost:3001/api/getdata");
      setData(res.data);
    };
    getItemsList();
  }, []);
  const addItem = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/addata",
        "data object"
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return <></>;
}

export default App;
