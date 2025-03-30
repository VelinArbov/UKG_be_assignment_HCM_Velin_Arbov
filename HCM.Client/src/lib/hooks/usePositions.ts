import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const usePositions = () => {
  const quryClient = useQueryClient();

  const { data: positions, isPending } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await agent.get<Position[]>("positions");
      return response.data;
    },
  });

  const updatePosition = useMutation({
    mutationFn: async (position: Position) => {
      await agent.put(`/positions/${position.id}`, position);
    },
    onSuccess: async () => {
      await quryClient.invalidateQueries({
        queryKey: ["positions"],
      });
    },
  });

  return {
    positions,
    isPending,
    updatePosition,
  };
};
