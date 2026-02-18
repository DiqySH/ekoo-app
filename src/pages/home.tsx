import { useEffect, useRef, useState } from "react";
import { type ChatForm, type Message } from "@/@types/ai";
import { useForm } from "react-hook-form";
import { useAiChat } from "@/hooks/useAiChat";
import ChatMessages from "@/components/ui/chat-messages";
import ChatInput from "@/components/ui/chat-input";
import ImagePreview from "@/components/ui/image-preview";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const listeningRef = useRef(false);
  const finalTranscriptRef = useRef<string>("");
  const recognitionRef = useRef<ISpeechRecognition>(null);
  const { register, handleSubmit, reset, control, setValue } =
    useForm<ChatForm>();
  const { mutateAsync, isPending } = useAiChat();

  const submit = async (inputs: ChatForm) => {
    const content: Message["content"] = imageBase64
      ? [
          { type: "text", text: inputs.content },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBase64}`,
            },
          },
        ]
      : inputs.content;

    const newMessage: Message = {
      role: "user",
      content,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    setImageBase64(null);

    const reply = await mutateAsync(updatedMessages);

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      if (!listeningRef.current) return;

      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setValue("content", finalTranscriptRef.current + interimTranscript, {
        shouldDirty: true,
      });
    };

    recognition.onend = () => {
      if (listeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    finalTranscriptRef.current = "";
    listeningRef.current = true;
    recognitionRef.current?.start();
    setListening(true);
  };

  const stopListening = () => {
    listeningRef.current = false;
    setListening(false);
    recognitionRef.current?.stop();
  };

  const handleVoiceClick = () => {
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const handleImageSelect = async (file: File) => {
    const base64 = await fileToBase64(file);
    setImageBase64(base64);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages);
  }, [messages]);

  return (
    <div className="w-full bg-white flex flex-row">
      <div className="flex-1 flex flex-col h-screen relative md:px-0 px-4">
        <div className="overflow-y-auto flex-1 flex flex-col items-center">
          <ChatMessages messages={messages} />
          {messages.length !== 0 && <div ref={bottomRef} />}
          <div className="sticky bottom-0 w-full flex flex-col items-center bg-gradient-to-t from-white to-white/95 pb-4 z-10">
            <ImagePreview
              imageBase64={imageBase64}
              onRemove={() => setImageBase64(null)}
            />
            <ChatInput
              onSubmit={submit}
              listening={listening}
              onVoiceClick={handleVoiceClick}
              onImageSelect={handleImageSelect}
              isPending={isPending}
              register={register}
              handleSubmit={handleSubmit}
              reset={reset}
              control={control}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
