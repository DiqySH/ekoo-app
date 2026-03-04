import { useRef } from "react";
import TextArea from "react-textarea-autosize";
import type { ChatForm } from "@/features/chat/types";
import { createTextareaKeyDown } from "@/shared/utils";
import { useWatch } from "react-hook-form";
import {
  type UseFormRegister,
  type UseFormHandleSubmit,
  type Control,
} from "react-hook-form";
import { ArrowUp, Mic, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lottie from "react-lottie-player";
import waveDataAnimation from "@/assets/animations/wave.json";

interface ChatInputProps {
  submit: (inputs: ChatForm) => void;
  listening: boolean;
  onToggleListening: () => void;
  onImageSelect: (file: File) => void;
  isPending: boolean;
  register: UseFormRegister<ChatForm>;
  handleSubmit: UseFormHandleSubmit<ChatForm>;
  control: Control<ChatForm>;
}

const ChatInput = ({
  submit,
  listening,
  onToggleListening,
  onImageSelect,
  isPending,
  register,
  handleSubmit,
  control,
}: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const content = useWatch({
    control,
    name: "content",
  });

  const onKeyDown = createTextareaKeyDown(handleSubmit(submit));

  useGSAP(() => {
    gsap.to(".speech-and-send-container", {
      x: listening ? 56 : 0,
      ease: "power2.out",
    });

    gsap.to(".send", {
      display: listening ? "hidden" : "",
    });
  }, [listening]);

  return (
    <>
      <form
        className="flex flex-col max-w-200 w-full border border-black/40 rounded-4xl bg-white px-3 pb-3 overflow-hidden fixed bottom-5"
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
                    onClick={onToggleListening}
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
                    onClick={onToggleListening}
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
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onImageSelect(file);
        }}
      />
    </>
  );
};

export default ChatInput;
