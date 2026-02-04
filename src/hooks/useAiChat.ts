import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Message } from "@/@types/ai";

export const useAiChat = () => {
  return useMutation<string, Error, Message[]>({
    mutationFn: async (messages) => {
      const res = await api.post("/api/ai/chat", { messages });
      return res.data.data;
    },
  });
};
