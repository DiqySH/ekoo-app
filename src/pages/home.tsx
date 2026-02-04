import { useEffect, useRef, useState } from "react";
import TextArea from "react-textarea-autosize";
import { type ChatForm, type Message } from "@/@types/ai";
import { createTextareaKeyDown } from "@/utils/textarea";
import { useForm, useWatch } from "react-hook-form";
import { ArrowUp, Mic, Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lottie from "react-lottie-player";
import waveDataAnimation from "@/assets/animations/wave.json";
import { useAiChat } from "@/hooks/useAiChat";
import { extractText, extractImageUrl } from "@/utils/ai";
import BubbleChat from "@/components/ui/bubbleChat";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, control, setValue } =
    useForm<ChatForm>();
  const { mutateAsync, isPending } = useAiChat();

  const content = useWatch({
    control,
    name: "content",
  });

  const submit = async (inputs: ChatForm) => {
    reset();

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

  const onKeyDown = createTextareaKeyDown(handleSubmit(submit));

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

  useGSAP(() => {
    gsap.to(".speech-and-send-container", {
      x: listening ? 56 : 0,
      ease: "power2.out",
    });

    gsap.to(".send", {
      display: listening ? "hidden" : "",
    });
  }, [listening]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages);
  }, [messages]);

  return (
    <div className="w-full bg-white">
      <div className="w-full min-h-screen flex flex-col items-center md:px-0 px-4">
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
                WELCOME
              </h1>
            </div>
          )}
          {messages.length !== 0 && <div ref={bottomRef} />}
        </div>
        <div className="flex flex-col justify-center fixed bottom-10 inset-x-2 md:inset-x-0 mx-auto items-center">
          {imageBase64 && (
            <div className="max-w-200 w-full mb-2 flex items-start justify-start">
              <div className="relative">
                <button
                  className="absolute top-1 right-1 bg-black/50 rounded-full grid place-items-center p-1 cursor-pointer"
                  onClick={() => setImageBase64(null)}
                >
                  <X color="white" strokeWidth={1} size={16} />
                </button>
                <img
                  src={`data:image/png;base64,${imageBase64}`}
                  alt=""
                  className="rounded-xl max-h-25"
                />
              </div>
            </div>
          )}
          <form
            className="flex flex-col max-w-200 w-full border border-black/40 rounded-4xl bg-white px-3 pb-3 overflow-hidden"
            onSubmit={handleSubmit(submit)}
          >
            <TextArea
              maxRows={8}
              className="resize-none focus:outline-0 px-4 py-6 hide-scroll"
              placeholder="I just bought matcha for 5,000 rupiah..."
              onKeyDown={onKeyDown}
              {...register("content", { required: true })}
            />
            <div className="flex w-full h-10 justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="grid place-items-center w-10 h-10 cursor-pointer"
                      disabled={isPending}
                    >
                      <Plus strokeWidth={1.5} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a media</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center gap-4 speech-and-send-container">
                <Tooltip>
                  <TooltipTrigger asChild>
                    {listening ? (
                      <button
                        className="grid place-items-center w-10 h-10 cursor-pointer bg-black rounded-full"
                        onClick={handleVoiceClick}
                        type="button"
                        disabled={isPending}
                      >
                        <Lottie
                          loop
                          play
                          animationData={waveDataAnimation}
                          style={{
                            width: 30,
                          }}
                        />
                      </button>
                    ) : (
                      <button
                        className="grid place-items-center w-10 h-10 cursor-pointer rounded-full"
                        onClick={handleVoiceClick}
                        type="button"
                        disabled={isPending}
                      >
                        <Mic strokeWidth={1.5} />
                      </button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Speech to Text</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="grid place-items-center w-10 h-10 bg-[#242424] rounded-full cursor-pointer disabled:opacity-40 transition-all send"
                      disabled={!content?.trim() || isPending}
                      type="submit"
                    >
                      <ArrowUp color="white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </form>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageSelect(file);
        }}
      />
    </div>
  );
};

export default Home;
