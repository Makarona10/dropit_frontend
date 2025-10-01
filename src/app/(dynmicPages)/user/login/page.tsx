"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const inputStyle =
  "md:text-lg text-sm p-2 rounded-sm text-sm w-full my-1 bg-neutral-200/10 outline-none ring-0 ring-offset-0" +
  "border-none border-b-2 border-transparent focus:border-b-primary-400";
const placeholderStyle =
  "placeholder:md:text-base placeholder:text-sm placeholder:text-neutral";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response: any = await login(formData.email, formData.password);

      if (response?.status === 200) {
        setSuccess("Login successful");
        router.push("/cloud/recents");
        setFormData({ email: "", password: "" });
      } else {
        setError(response?.data?.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    isAuthenticated().then((res) => {
      if (res) {
        return router.push("/cloud/recents");
      } else {
        setAuthReady(true);
      }
    });

    return () => {
      setAuthReady(false);
    };
  }, []);

  if (!authReady) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-[url('/mockup.jpg')] bg-cover bg-center ">
      <div className="md:w-[700px] w-full md:bg-neutral-900/90 bg-neutral-900/70 h-full flex flex-col md:p-20 p-5 border-r-[1px] border-white/30">
        <div className="flex items-center sm:h-20 py-3  mb-6">
          <div className="text-2xl">
            <Image
              src={"/whitelogo.png"}
              width={250}
              height={250}
              alt="dropit logo"
              className="md:h-20 md:w-20 h-14 w-14"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="md:text-3xl text-xl font-bold">Sign in</h1>
            <p className="mb-4 opacity-70 md:text-lg text-sm">
              Enter your email and password and get back your uploaded files
            </p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form className="w-full mt-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="w-full">
                <label className="flex flex-col md:text-lg text-sm w-full">
                  Email
                  <input
                    className={`${inputStyle} ${placeholderStyle}`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="mohamed@provider.com"
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="flex flex-col md:text-lg text-sm w-full">
                  Password
                  <input
                    className={`${inputStyle} ${placeholderStyle}`}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Type your password"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full my-3 p-2 bg-primary-500 md:text-lg text-sm rounded-md active:bg-primary-600"
              >
                SIGN IN
              </button>
              <div className="flex justify-center md:text-sm text-xs gap-2 opacity-70">
                <a
                  href="/user/register"
                  className="cursor-pointer underline hover:no-underline"
                >
                  Create an account
                </a>
                <p className="cursor-pointer underline hover:no-underline">
                  Forgot password?
                </p>
              </div>
              <div className="w-full flex items-center justify-center gap-1">
                <div className="w-full flex gap-4 cursor-pointer p-2 justify-center items-center bg-white rounded-sm">
                  <p className="md:text-sm text-xs text-black/80 line-clamp-1">
                    Login with Google
                  </p>
                  <FontAwesomeIcon
                    width={18}
                    height={18}
                    icon={faGoogle}
                    className="text-red-500/90"
                  />
                </div>
                <div className="w-full flex gap-4 cursor-pointer p-2 justify-center items-center bg-[#3b5998] rounded-sm">
                  <p className="md:text-sm text-xs text-white/90 line-clamp-1">
                    Login with Facebook
                  </p>
                  <FontAwesomeIcon
                    width={18}
                    height={18}
                    icon={faFacebook}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
