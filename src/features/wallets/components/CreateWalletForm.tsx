import { Input, Label, Loading, Separator } from "@/shared/components/ui";
import { useForm } from "react-hook-form";
import Card from "./Card";
import Radio from "./Radio";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWalletSchema } from "../schemas/create-wallet";
import type { CreateWalletValues } from "../types";
import { createWalletMutate } from "../api";
import { useMutation } from "@tanstack/react-query";

const CreateWalletForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateWalletValues>({
    resolver: zodResolver(CreateWalletSchema),
    defaultValues: {
      wallet_name: "",
    },
  });

  const { mutate, isPending } = useMutation(createWalletMutate());

  const onSubmit = (data: CreateWalletValues) => {
    try {
      mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending) return <Loading />;

  return (
    <form className="flex gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="text-[17px] font-semibold">New Wallet</p>
          <p className="text-[15px] opacity-65">
            Organize tasks and notes in one dedicated space.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="flex w-full items-center justify-between">
            <span>Name</span>
            <span className="text-[13px] font-normal opacity-65">
              {watch("wallet_name").length}/16
            </span>
          </Label>
          <Input placeholder="Username's Wallet" {...register("wallet_name")} />
          {errors.wallet_name && (
            <span className="text-sm text-red-500">
              {errors.wallet_name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Starting Balance</Label>
          <Input placeholder="Rp 0" />
          <Link to="#" className="text-[13px] text-[#228D57] underline">
            Need help calculate ?
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Collaborator</Label>
          <Input placeholder="@ Example@gmail.com" />
        </div>
      </div>
      <Separator orientation="vertical" className="min-h-100" />
      <div className="flex flex-col max-w-160 w-full gap-5">
        <div className="flex flex-col">
          <p className="text-[17px] font-semibold">Wallet Plan</p>
          <p className="text-[15px] opacity-65">
            You are free to change your plan at any time.
          </p>
        </div>
        <div className="flex gap-5">
          <Card className="flex flex-col p-3.75 gap-5 flex-1/2 cursor-pointer">
            <div className="flex w-full items-center gap-2.5">
              <Radio status="active" />
              <span className="text-[19px] font-medium">Starter</span>
              <span className="text-xl font-bold ml-auto">Free</span>
            </div>
            <p className="text-[17px] font-light">
              Perfect for anyone who wants simple money management.
            </p>
            <div className="flex flex-col gap-2.5">
              <ul>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">
                    Access to essentials finance
                  </span>
                </li>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">5 Summaries</span>
                </li>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">
                    100 AI tokens / Month
                  </span>
                </li>
              </ul>
            </div>
          </Card>
          <Card
            className="flex flex-col p-3.75 gap-5 flex-1/2 cursor-pointer"
            style={{
              background:
                "linear-gradient(179.92deg, #FFFFFF 0.07%, #F7FFBA 124.16%)",
            }}
          >
            <div className="flex w-full items-center gap-2.5">
              <Radio status="inactive" />
              <span className="text-[19px] font-medium">Professional</span>
              <span className="text-xl font-bold ml-auto">Rp200.000</span>
            </div>
            <p className="text-[17px] font-light">
              Designed for advanced finance management, Best for teams.
            </p>
            <div className="flex flex-col gap-2.5">
              <ul>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">
                    Access to essentials finance
                  </span>
                </li>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">100 Summaries</span>
                </li>
                <li className="flex gap-5">
                  <Check />
                  <span className="text-[19px] font-medium">
                    300 AI tokens / Month
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
        <div className="flex items-center gap-2.5">
          <Button type="submit">Create</Button>
          <Link className="px-[13px]" to="#">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreateWalletForm;
