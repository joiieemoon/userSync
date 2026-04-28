import { useQuery } from "@tanstack/react-query";
import { getDashboardDataApi } from "../../services/dash-board-api";
export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardDataApi,
  });
};
