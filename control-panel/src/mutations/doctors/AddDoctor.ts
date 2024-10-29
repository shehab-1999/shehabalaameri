import { apifetch } from "@/api";

export const addDoctor = async (data: any) => {
  try {
    const response = await apifetch.post(`addDoctor`, data);

    if (response.status!==200) {
      throw new Error("Error adding doctor: " + response.statusText);
    }

    return response.data; // Assuming response contains added doctor data
  } catch (error: any) {
    console.error("Error adding doctor:", error);
    throw error; // Re-throw for handling in your component
  }
};