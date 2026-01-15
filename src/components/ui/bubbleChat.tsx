/* eslint-disable @typescript-eslint/no-explicit-any */
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const bubbleChatVariants = cva("rounded-xl leading-relaxed", {
  variants: {
    variant: {
      user: "bg-[#2F855A] text-white ml-auto max-w-[60%] px-4 py-2",
      assistant: "bg-white text-[#2D3748] mr-auto max-w-[100%] py-4 px-5",
      system: "bg-zinc-200 text-zinc-600 mx-auto text-xs",
    },
  },
  defaultVariants: {
    variant: "user",
  },
});

type BubbleChatProps = {
  children: string;
} & React.ComponentProps<"div"> &
  VariantProps<typeof bubbleChatVariants>;

const BubbleChat = ({
  children,
  variant,
  className,
  ...props
}: BubbleChatProps) => {
  return (
    <div className={bubbleChatVariants({ variant, className })} {...props}>
      {variant === "user" ? (
        <p>{children}</p>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: (props) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              />
            ),
            code({ inline, className, children }: any) {
              return inline ? (
                <code className="bg-zinc-100 px-1 rounded text-sm">
                  {children}
                </code>
              ) : (
                <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg overflow-x-auto text-sm">
                  <code className={className}>{children}</code>
                </pre>
              );
            },
          }}
        >
          {children}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default BubbleChat;
