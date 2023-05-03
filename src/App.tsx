import { useEffect } from "react";
import "./App.css";
import { useDataStore } from "./store";

function App() {
  const { data, loadData, addData, updateData, deleteData } = useDataStore();

  useEffect(() => {
    loadData();
  }, []);
  console.log(data);

  const handleAddData = async () => {
    const newData = {
      id: 101,
      name: "John Doe",
      email: "johndoe@example.com",
      gender: "male",
      address: { street: "123 Main St", city: "Anytown" },
      phone: "+1 (555) 555-5555",
    };
    await addData(newData);
  };
  const handleUpdateData = async (id: number, data: any) => {
    const updatedData = {
      id: 1,
      name: "Jane Doe",
      email: "janedoe@example.com",
      gender: "female",
      address: { street: "456 Elm St", city: "Anytown" },
      phone: "+1 (555) 555-5555",
    };
    await updateData(id, data);
  };
  const handleDeleteData = async (id: number) => {
    await deleteData(id);
  };

  return <></>;
}

export default App;
