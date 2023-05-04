import { create } from "zustand";
import axios from "axios";

export type Address = {
  street: string;
  city: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: Address;
  phone: string;
};

export type DataStore = {
  data: User[];
  loadData: () => Promise<void>;
  addData: (user: User) => Promise<void>;
  updateData: (id: number, user: User) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
};

export const useDataStore = create<DataStore>((set) => ({
  data: [],

  loadData: async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getdata");
      set({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addData: async (user: User) => {
    console.log("user");
    try {
      await axios.post("http://localhost:3001/api/addata", user);
      set((state) => ({ data: [...state.data, user] }));
    } catch (error) {
      console.log(error);
    }
  },

  updateData: async (id: number, user: User) => {
    console.log(id, user);
    try {
      await axios.put(`http://localhost:3001/api/addata/${id}`, user);
      set((state) => ({
        data: state.data.map((u) => (u.id == id ? user : u)),
      }));
      console.log("ariqa");
    } catch (error) {
      console.log(error);
    }
  },
  deleteData: async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/addata/${id}`);
      set((state) => ({
        data: state.data.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
