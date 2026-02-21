import { useEffect, useRef, useState } from "react";
import type { ChatForm, Message } from "../types";
import { useForm } from "react-hook-form";
import { useAiChat } from "../hooks/use-ai-chat";
import ChatMessages from "@/shared/components/ui/chat-messages";
import ChatInput from "@/shared/components/ui/chat-input";
import ImagePreview from "@/shared/components/ui/image-preview";

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

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const listeningRef = useRef(false);
  const finalTranscriptRef = useRef<string>("");
  const recognitionRef = useRef<ISpeechRecognition>(null);
  const { register, handleSubmit, control, reset, setValue } =
    useForm<ChatForm>();
  const { mutateAsync, isPending } = useAiChat();

  const submit = async (inputs: ChatForm) => {
    reset();
    try {
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
    } catch (error) {
      console.error(error);
    }
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
  }, [setValue]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      listeningRef.current = false;
      setListening(false);
    } else {
      recognitionRef.current.start();
      listeningRef.current = true;
      finalTranscriptRef.current = "";
      setListening(true);
    }
  };

  const handleImageSelect = async (file: File) => {
    const base64 = await fileToBase64(file);
    setImageBase64(base64);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-screen w-full bg-white/50 flex flex-col overflow-y-scroll items-center">
      <ChatMessages messages={messages} />
      <div id="bottom" ref={bottomRef} />
      {imageBase64 && (
        <ImagePreview
          imageBase64={imageBase64}
          onRemove={() => setImageBase64(null)}
        />
      )}
      <ChatInput
        register={register}
        handleSubmit={handleSubmit}
        submit={submit}
        control={control}
        isPending={isPending}
        listening={listening}
        onToggleListening={toggleListening}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default Chat;
