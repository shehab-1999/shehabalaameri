import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";

export default function useGetDoctorById(id: string) {
  return useQuery({
    queryKey: [`getDoctorById`],
    queryFn: async () => {
      return await fetcDoctor(id);
    },
  });
}

const fetcDoctor = async (id: string): Promise<any> => {
  const response = await apifetch.get(`getDoctorById/${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
};
