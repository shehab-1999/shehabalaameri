import { apifetch } from "@/api";
import { Staff } from "@/components/types/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
export const useGetStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      return await getStaffs();
    },
  });
};
const getStaffs = async (): Promise<Staff> => {
  const response = await apifetch.get("get_staff");
  try {
    if (response.status !== 200) {
      throw new Error("error geting staff" + response.statusText);
    }
    return response.data;
  } catch (error) {
    console.error("error geting staff", error);
    throw error;
  }
};
