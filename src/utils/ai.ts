import type { Content, Message } from "@/@types/ai";

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
