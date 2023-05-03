import { useEffect } from "react";
import "./App.css";
import { useDataStore, User } from "./store";
import { Table, Button, Space } from "antd";
const { Column } = Table;

function App() {
  const { data, loadData, addData, updateData, deleteData } = useDataStore();

  useEffect(() => {
    loadData();
  }, []);

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

  return (
    <>
      <Table dataSource={data} rowKey="id">
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
          render={(text) => <>{`${text.street}, ${text.city}`}</>}
        />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          title="Action"
          key="action"
          render={(text: User, record: User) => (
            <Space>
              <Button danger onClick={() => handleDeleteData(record.id)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default App;
