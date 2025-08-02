"use client";
import { useState } from "react";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const inputStyle =
  "sm:text-lg p-2 rounded-sm text-sm mt-1 w-full bg-neutral-200/10 outline-0 border-b-2 border-transparent focus:border-b-primary-400";
const placeholderStyle = "placeholder:text-base placeholder:text-neutral";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/register`,
        {
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
        },
      );

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
    <div className="flex flex-col">
      <div className="flex items-center px-16 sm:h-16 border-b-2 border-b-slate-300/30">
        <div className="text-2xl">Dropit Logo</div>
      </div>
      <div className="h-full w-full">
        <div className="sm:w-[500px] flex flex-col rounded-lg p-7 border-2 border-neutral-700 m-auto mt-28">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="mb-4 opacity-70">
              Create a new account and start uploading your files to dropit
            </p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form className="w-full mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3">
                <div>
                  <label className="flex flex-col text-lg w-full">
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
                  <label className="flex flex-col text-lg w-full">
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
                <label className="flex flex-col text-lg w-full">
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
              <div>
                <label className="flex flex-col text-lg">
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
                className="w-full my-3 p-2 bg-primary-500 text-lg rounded-md active:bg-primary-600"
              >
                REGISTER
              </button>
              <div className="flex items-center justify-center gap-1">
                <div className="w-full flex gap-4 cursor-pointer p-2 justify-center items-center bg-white rounded-sm">
                  <p className="sm:text-sm text-xs text-black/80 line-clamp-1">
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
                  <p className="sm:text-sm text-xs text-white/80 line-clamp-1">
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
