import type { SignInValues } from "../types";
import Button from "@/shared/components/ui/button";
import Input from "@/shared/components/ui/input";
import Label from "@/shared/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../schemas/auth";
import ErrorSpan from "@/shared/components/ui/error-span";
import { useAuth } from "../contexts/auth";

const SignIn = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const submit = async (inputs: SignInValues) => {
    reset();
    const { email, password } = inputs;
    try {
      const { data } = await signInWithEmail(email, password);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex">
      <div className="flex-1/2 grid place-items-center bg-[#E8E9C9] relative">
        <img
          src="/ekoo-logo.svg"
          alt="ekoo-logo"
          className="max-w-20 absolute top-5 left-5"
        />
        <div className="flex flex-col max-w-70 w-full gap-10">
          <div className="flex flex-col">
            <h1 className="text-[#FF6E3C] font-medium text-2xl">Hey,</h1>
            <h1 className="text-[#228D57] font-bold text-4xl">Welcome Back</h1>
            <p className="text-black/75 mt-2">Glad to see you back!</p>
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
            <Button className="w-full mt-2" type="submit">
              Sign In
            </Button>
          </form>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => signInWithGoogle()}
              className="w-full border border-[#228D57] text-[#228D57] px-4 py-2 rounded-md text-sm font-medium transition hover:bg-[#228D57]/10"
            >
              Sign In with Google
            </button>
          </div>
          <div className="text-center text-sm">
            <p className="text-black/75">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#228D57] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
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

export default SignIn;
