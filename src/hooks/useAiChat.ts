import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Content, Message } from "@/@types/ai";

export const useAiChat = () => {
  return useMutation<string, Error, Message[]>({
    mutationFn: async (messages) => {
      const res = await api.post("/api/ai/chat", { messages });
      return res.data.data; // string
    },
  });
};

export const extractText = (content: Content): string => {
  if (typeof content === "string") return content;

  return content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n");
};

export const extractImageUrl = (content: Message["content"]) => {
  if (!Array.isArray(content)) return null;

  const imageItem = content.find(
    (c): c is { type: "image_url"; image_url: { url: string } } =>
      c.type === "image_url"
  );

  return imageItem?.image_url.url || null;
};
