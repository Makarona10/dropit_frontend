"use client";
import { useState } from "react";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleAuth from "@/components/auth/GoogleOAuth";

const inputStyle =
  "md:text-lg text-sm p-2 rounded-sm text-sm mt-1 w-full bg-neutral-200/10 outline-none border-b-2 border-transparent focus:border-b-primary-400";
const placeholderStyle =
  "placeholder:md:text-base placeholder:text-sm placeholder:text-neutral";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isSignByGoogleVisible, setIsSignByGoogleVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "User created successfully");
        router.push("/user/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[url('/mockup.jpg')] bg-cover bg-center">
      <GoogleAuth
        isOpen={isSignByGoogleVisible}
        onClose={() => setIsSignByGoogleVisible(false)}
      />
      <div className="md:w-[700px] w-full md:bg-neutral-900/90 bg-neutral-900/70 h-full flex flex-col md:p-20 p-5 border-r-[1px] border-white/30">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="text-2xl">
              <Image
                src={"/whitelogo.png"}
                width={250}
                height={250}
                alt="dropit logo"
                className="md:h-20 md:w-20 w-14 h-14"
              />
            </div>
            <h1 className="md:text-3xl text-xl font-bold">Register</h1>
            <p className="mb-4 opacity-70 md:text-lg text-sm">
              Create a new account and start uploading your files to dropit
            </p>
          </div>
          {error && <p className="text-red-500 sm:text-sm text-xs">{error}</p>}
          {success && (
            <p className="text-green-500 sm:text-sm text-xs">{success}</p>
          )}
          <form className="w-full mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3">
                <div>
                  <label className="flex flex-col md:text-lg text-sm w-full">
                    First name
                    <input
                      className={`${inputStyle} ${placeholderStyle}`}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col md:text-lg text-sm w-full">
                    Last name
                    <input
                      className={`${inputStyle} ${placeholderStyle}`}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                    />
                  </label>
                </div>
              </div>
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
              <div>
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
              <div>
                <label className="flex flex-col md:text-lg text-sm w-full">
                  Password confirmation
                  <input
                    className={`${inputStyle} ${placeholderStyle}`}
                    type="password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                    placeholder="Retype your password"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full my-3 p-2 bg-primary-500 md:text-lg text-sm rounded-md active:bg-primary-600"
              >
                REGISTER
              </button>
              <a
                href="/user/login"
                className="cursor-pointer underline hover:no-underline opacity-70 sm:text-sm text-xs relative bottom-3"
              >
                Login with an existing account
              </a>
              <div className="flex items-center justify-center gap-1">
                <div
                  onClick={() => setIsSignByGoogleVisible(true)}
                  className="w-full flex gap-4 cursor-pointer p-2 justify-center items-center bg-white rounded-sm"
                >
                  <p className="md:text-sm text-xs text-black/80 line-clamp-1">
                    Register with Google
                  </p>
                  <FontAwesomeIcon
                    width={18}
                    height={18}
                    icon={faGoogle}
                    className="text-red-500/90"
                  />
                </div>
                <div className="w-full flex gap-4 cursor-pointer p-2 justify-center items-center bg-[#3b5998] rounded-sm">
                  <p className="md:text-sm text-xs text-white/80 line-clamp-1">
                    Register with Facebook
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

export default RegisterPage;
