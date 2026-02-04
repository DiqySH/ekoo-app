import type { SignInValues } from "@/@types/authSchemas";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/auth";
import ErrorSpan from "@/components/ui/errorSpan";
import { useAuth } from "@/context/auth";

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
              <span className="text-sm text-black/75 ml-auto">
                Forgot Password?
              </span>
            </div>
            <Button type="submit">Sign In</Button>
            <Button
              variant="secondary"
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                await signInWithGoogle();
              }}
            >
              <div className="flex justify-center items-center gap-3">
                <span>Sign In with Google</span>
                <img
                  src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
                  alt=""
                  className="max-w-5"
                />
              </div>
            </Button>
          </form>
          <span className="text-sm text-black/75">
            Don't have an account?
            <Link to="/sign-up" className="ml-2 text-[#FF6E3C] font-bold">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
      <div className="flex-1/2 bg-[#E8E9C9] lg:flex hidden">
        <div className="flex-1 p-2 flex">
          <div
            className="flex-1 bg-white rounded-xl grid place-items-center"
            // style={{
            //   backgroundImage: "url(/pattern.svg)",
            // }}
          >
            <img src="/pattern.svg" alt="" className="max-w-[50%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
