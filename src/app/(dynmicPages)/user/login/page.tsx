"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const inputStyle =
  "sm:text-lg p-2 rounded-sm text-sm w-full my-1 bg-neutral-200/10 outline-0 border-b-2 border-transparent focus:border-b-primary-400";
const placeholderStyle = "placeholder:text-base";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        // Store access_token in localStorage (or adjust as needed)
        localStorage.setItem("access_token", response.data.data.access_token);
        setSuccess("Login successful");
        router.push("/cloud/recents");
        setFormData({ email: "", password: "" });
      } else {
        setError(response.data?.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-16 sm:h-16 border-b-2 border-b-slate-300/30">
        <div className="text-2xl">Dropit Logo</div>
      </div>
      <div className="h-full w-full">
        <div className="sm:w-[500px] flex flex-col rounded-lg p-7 border-2 border-neutral-700 m-auto mt-28">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="mb-4 opacity-70">
              Enter your email and password and get back your uploaded files
            </p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form className="w-full mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center w-full">
              <div className="w-full">
                <label className="flex flex-col text-lg">
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
                <label className="flex flex-col text-lg">
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
                className="w-full my-3 p-2 bg-primary-500 text-lg rounded-md active:bg-primary-600"
              >
                SIGN IN
              </button>
              <div className="flex justify-center text-sm gap-2 opacity-70">
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
                  <p className="text-md text-black/80 line-clamp-1">
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
                  <p className="text-md text-white/80 line-clamp-1">
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
