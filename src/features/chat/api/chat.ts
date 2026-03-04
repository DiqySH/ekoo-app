import { useMutation } from "@tanstack/react-query";
import { api } from "@/core/api";
import type { Message } from "../types";

interface ChatResponse {
  data: string;
}

export const useAiChat = () => {
  return useMutation<string, Error, Message[]>({
    mutationFn: async (messages) => {
      const res = await api.post<ChatResponse>("/chatbot/chat", { messages });
      return res.data.data;
    },
  });
};
