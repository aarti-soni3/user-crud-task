const API_URL = "https://simplecrudapi.com/api/users";

export const userApi = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("failed to fetch user");
      const data = await response.json();
      console.log(data);
      console.log(data.data);
      // return Array.isArray(data) ? data : data.data || [];
      return data.data || [];
    } catch (error) {
      throw new Error(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("failed to fetch user");
      const data = await response.json();
      console.log(data);
      return data.data || data;
    } catch (error) {
      throw new Error(error);
    }
  },

  create: async (userData) => {
    console.log(userData)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("failed to create user");
      const data = await response.json();
      console.log(data);
      return data.data || data;
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (id, userData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("failed to update user");
      const data = await response.json();
      console.log(data);
      console.log(data.data);
      return data.data || data;
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("failed to delete user");
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default userApi;
