import { useEffect, useState } from "react";
import "./App.css";
import { useDataStore, User } from "./store";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { Pie } from "@ant-design/charts";
import "antd/dist/antd.css";
import { Select } from "antd";
import Option from "antd/es/Select";
const { Column } = Table;

function App() {
  const { data, loadData, addData, updateData, deleteData } = useDataStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
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
    id: 0,
  });
  const handleUpdateData = async (id: number, newData: User) => {
    await updateData(id, newData);
    setModal(false);
  };

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
        id: 0,
      });
      setIsModalVisible(false);
      setError("");
    } else {
      setError("სავალდებულოა ყველა ველის შევსება");
    }
  };
  const handleDoubleClick = (record: any) => {
    setSelectedRow(record);
    setFormData(record);
    setModal(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteData = async (id: number) => {
    await deleteData(id);
  };

  const pagination = {
    pageSize: 5,
    total: data.length,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <>
      <Button
        type="primary"
        style={{ margin: "15px" }}
        onClick={() => {
          setFormData({
            name: "",
            email: "",
            gender: "",
            address: {
              street: "",
              city: "",
            },
            phone: "",
            id: 0,
          });
          setIsModalVisible(true);
        }}
      >
        Add Data
      </Button>
      <Table
        dataSource={data}
        pagination={pagination}
        style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}
        onRow={(record) => ({ onDoubleClick: () => handleDoubleClick(record) })}
      >
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
        title="update Data"
        open={modal}
        onOk={
          selectedRow
            ? () => handleUpdateData(selectedRow.id, formData)
            : undefined
        }
        onCancel={() => {
          setSelectedRow(null);
          setModal(false);
        }}
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
