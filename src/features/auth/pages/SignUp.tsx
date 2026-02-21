/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SignUpValues } from "../types";
import Button from "@/shared/components/ui/button";
import Input from "@/shared/components/ui/input";
import Label from "@/shared/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/auth";
import ErrorSpan from "@/shared/components/ui/error-span";
import { useAuth } from "../contexts/auth";
import { useState } from "react";

const SignUp = () => {
  const [, setIsVerifying] = useState<boolean>(false);
  const [, setEmail] = useState<string>("");
  const { signUpWithEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const submit = async (inputs: SignUpValues) => {
    reset();
    const { email, password } = inputs;
    try {
      const { data } = await signUpWithEmail(email, password);
      console.log(data);
      setEmail(email);
      setIsVerifying(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const sendVerification = async () => {
  //   const { data } = await database.auth.resend({
  //     type: "signup",
  //     email,
  //   });

  //   console.log(data);
  // };

  // useEffect(() => {
  //   if (!isVerifying) return;

  //   let mount = false;
  //   if (mount) return;
  //   sendVerification();
  //   mount = true;
  // }, [isVerifying]);

  return (
    <div className="w-full min-h-screen flex">
      <div className="flex-1/2 grid place-items-center bg-[#E8E9C9] relative">
        <img
          src="/ekoo-logo.svg"
          alt="ekoo-logo"
          className="max-w-20 absolute top-5 left-5"
        />
        {/* {isVerifying ? (
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col">
              <h1 className="text-[#FF6E3C] font-medium text-2xl">Hey,</h1>
              <h1 className="text-[#228D57] font-bold text-xl">
                We've sent you your verification email
              </h1>
              <h1 className="text-[#228D57] font-bold text-xl">{email}</h1>
            </div>
          </div>
        ) : ( */}
        <div className="flex flex-col max-w-70 w-full gap-10">
          <div className="flex flex-col">
            <h1 className="text-[#228D57] font-bold text-4xl">New Here?</h1>
            <p className="text-black/75 mt-2">Welcome to our special place!</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="text"
                placeholder="Email"
                id="email"
                {...register("email")}
              />
              {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorSpan>{errors.password.message}</ErrorSpan>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorSpan>{errors.confirmPassword.message}</ErrorSpan>
              )}
            </div>
            <Button className="w-full mt-2" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="text-center text-sm">
            <p className="text-black/75">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-[#228D57] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        {/* )} */}
      </div>
      <div className="flex-1/2 grid place-items-center bg-[#228D57]">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">EKOO</h1>
          <p className="text-white/75 mt-2">Intelligent Plant Care Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
