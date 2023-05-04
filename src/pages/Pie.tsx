import { useEffect } from "react";
import { useDataStore } from ".././store";
import { Pie } from "@ant-design/charts";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loadData } = useDataStore();
  useEffect(() => {
    loadData();
  }, []);
  const cities = data.map((person) => person.address.city);
  const counts = cities.reduce((acc: { [key: string]: number }, city) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(counts).map(([city, count]) => ({
    type: city,
    value: count,
    percentage: ((count / cities.length) * 100).toFixed(2) + "%",
  }));
  const config = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      content: "{name}\n{percentage}",
    },
    height: 1000,
    width: 1000,
  };
  return (
    <>
      <Button
        style={{ margin: "15px" }}
        type="primary"
        className="text-white text-center"
      >
        <Link to="/">Home</Link>
      </Button>
      <Pie {...config} />
    </>
  );
};
export default Home;
