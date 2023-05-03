import { useEffect, useState } from "react";
import "./App.css";
import { useDataStore, User } from "./store";
import { Table, Button, Space, Modal, Form, Input, Select } from "antd";
const { Option } = Select;
const { Column } = Table;

function App() {
  const { data, loadData, addData, updateData, deleteData } = useDataStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });
  const handleAddData = async () => {
    const newData = {
      ...formData,
      id: data.length + 1,
    };
    if (
      formData.address.city !== "" &&
      formData.address.street !== "" &&
      formData.email !== "" &&
      formData.gender !== "" &&
      formData.name !== "" &&
      formData.phone !== ""
    ) {
      await addData(newData);
      setFormData({
        name: "",
        email: "",
        gender: "",
        address: {
          street: "",
          city: "",
        },
        phone: "",
      });
      setIsModalVisible(false);
      setError("");
    } else {
      setError("სავალდებულოა ყველა ველის შევსება");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // const handleAddData = async () => {
  //   const newData = {
  //     id: 101,
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     gender: "male",
  //     address: { street: "123 Main St", city: "Anytown" },
  //     phone: "+1 (555) 555-5555",
  //   };
  //   await addData(newData);
  // };
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
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Data
      </Button>
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
      <Modal
        title="Add Data"
        open={isModalVisible}
        onOk={handleAddData}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e,
                })
              }
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Street">
            <Input
              name="street"
              value={formData.address.street}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    street: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              name="city"
              value={formData.address.city}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    city: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="email"
              value={formData.phone}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
          </Form.Item>
          <p style={{ color: "red" }}>{error}</p>
        </Form>
      </Modal>
    </>
  );
}

export default App;
