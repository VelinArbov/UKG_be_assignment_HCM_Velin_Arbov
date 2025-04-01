import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { Position, Result } from "../types";

export const usePositions = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: positions, isPending } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await agent.get<Result<Position[]>>("/positions");

      if (!response.data.isSuccess) {
        throw new Error(response.data.error ?? "Failed to load positions");
      }

      return response.data.value;
    },
  });

  const { data: position, isLoading: isLoadingPosition } = useQuery({
    queryKey: ["positions", id],
    queryFn: async () => {
      const response = await agent.get<Position>(`/positions/${id}`);

      return response.data;
    },
    enabled: !!id,
  });

  const updatePosition = useMutation({
    mutationFn: async (position: Position) => {
      console.log(position)
      const response = await agent.put<Result<void>>(
        `/positions/${position.id}`,
        position
      );

      if (!response.data.isSuccess) {
        throw new Error(response.data.error ?? "Failed to update position");
      }

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const createPosition = useMutation({
    mutationFn: async (position: Position) => {
      const response = await agent.post<Result<string>>("/positions", position);

      if (!response.data.isSuccess) {
        throw new Error(response.data.error ?? "Failed to create position");
      }

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  const deletePosition = useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.delete<Result<void>>(`/positions/${id}`);

      if (!response.data.isSuccess) {
        throw new Error(response.data.error ?? "Failed to delete position");
      }

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });

  return {
    positions,
    isPending,
    updatePosition,
    createPosition,
    deletePosition,
    position,
    isLoadingPosition,
  };
};
