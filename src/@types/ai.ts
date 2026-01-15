export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
  };
};

export type ContentItem = ImageContent | TextContent;

export type Content = string | ContentItem[];

export type Message = {
  role: "assistant" | "user" | "system";
  content: Content;
};

export type ChatForm = {
  content: string;
};

export type ChatResponse = {
  success: boolean;
  data: string;
};
