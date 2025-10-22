"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../common/Modal";
import { ModalProps } from "../common/Modal";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useApi } from "@/lib/useApi";

const GoogleAuth = ({ isOpen, onClose }: ModalProps) => {
  const { api } = useApi();

  const sendRequest = async () => {
    try {
      window.location.href = process.env.SERVER_URI + "/auth/google/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3 items-center p-4 sm:m-0">
        <FontAwesomeIcon
          icon={faGoogle}
          className="text-red-500/90 sm:size-10 size-6"
        />
        <div className="flex flex-col items-center">
          <p className="font-bold sm:text-lg">Sign up with Google</p>
          <p className="text-xs opacity-80">
            <b>Notice</b>: Your password will your first name + last name of
            your google account unless you didn't update it
          </p>
          <p className="text-xs opacity-80 font-bold mt-2">eg. JohnDoe</p>
        </div>
      </div>
      <button
        onClick={sendRequest}
        className="w-full font-bold active:scale-[98%] duration-300 bg-primary-500 text-white sm:text-sm text-xs p-2 rounded-md"
      >
        Continue
      </button>
    </Modal>
  );
};

export default GoogleAuth;
