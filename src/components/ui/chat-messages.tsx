import { type Message } from "@/@types/ai";
import { extractText, extractImageUrl } from "@/utils/ai";
import BubbleChat from "@/components/ui/bubble-chat";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex flex-col relative max-w-200 w-full pt-5 gap-4 pb-50 h-fit">
      {messages.length !== 0 ? (
        messages.map((message, i) => {
          const imageUrl = extractImageUrl(message.content);

          return (
            <div key={i} className="w-full flex flex-col">
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="max-w-[50%] ml-auto rounded-xl mb-3"
                  alt="user upload"
                />
              )}
              <BubbleChat variant={message.role}>
                {extractText(message.content)}
              </BubbleChat>
            </div>
          );
        })
      ) : (
        <div className="grid place-items-center">
          <h1 className="text-8xl font-bold text-[#228D57] mt-[calc(100vh/3)]">
            Ask anything
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
