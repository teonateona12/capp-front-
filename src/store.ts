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
      const response = await axios.get(
        "https://capp-api.onrender.com/api/getdata"
      );
      set({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addData: async (user: User) => {
    try {
      await axios.post("https://capp-api.onrender.com/api/addata", user);
      set((state) => ({ data: [...state.data, user] }));
    } catch (error) {
      console.log(error);
    }
  },

  updateData: async (id: number, user: User) => {
    try {
      await axios.put(`https://capp-api.onrender.com/api/addata/${id}`, user);
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
      await axios.delete(`https://capp-api.onrender.com/api/addata/${id}`);
      set((state) => ({
        data: state.data.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
