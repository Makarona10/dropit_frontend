"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Modal from "@/components/common/Modal";
import LoadingDots from "@/components/visuals/ButtonLoading";
import { useApi } from "@/lib/useApi";
import { buttons } from "@/styles";
import { useRef, useState } from "react";
import { FaShare } from "react-icons/fa";

interface ShareFileProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: number;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ShareFileModal({
  isOpen,
  onClose,
  fileId,
}: ShareFileProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [shareLoading, setShareLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { api } = useApi();

  const searchUsers = async () => {
    setUsersLoading(true);
    setSelectedUser(null);
    setError("");
    if (!email) {
      setUsers([]);
      setError("Please enter an email");
      return;
    }
    try {
      const res = await api(`/search/users/${email}`, "get", {});
      if (res.data.data.length === 0) {
        setUsers([]);
        setError("No users found");
      } else {
        setUsers(res.data.data);
        setError("");
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
    setUsersLoading(false);
  };

  const shareFile = async () => {
    if (!selectedUser?.email) {
      setError("Please select a user");
      return;
    }
    setError("");
    setShareLoading(true);
    try {
      const res = await api(`/share/file`, "post", {
        sharedWithEmail: selectedUser?.email,
        fileId: fileId,
      });
      if (res.status === 200) {
        setError("");
        onClose();
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
    setShareLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:w-96 w-[calc(100vw-60px)] flex flex-col gap-2 text-xs sm:text-sm">
        <div className="flex flex-col gap-1">
          <h1 className="sm:text-xl text-sm font-bold">Share File</h1>
          <p className="text-neutral-400 smtext-sm text-[11px]">
            Share this file with others
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmail(inputRef.current?.value || "");
            searchUsers();
          }}
          className="relative flex items-center gap-2 mt-3"
        >
          <input
            ref={inputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Share with... (Email)"
            className={`w-full p-2 border border-neutral-600
          bg-neutral-800 sm:text-sm text-[11px] outline-none rounded-md
          placeholder:text-neutral-500`}
          />
          <button
            type="submit"
            className="bg-green-600 rounded-md font-semibold active:bg-green-700"
          >
            search
          </button>
        </form>
        {usersLoading && (
          <div className=" flex items-center justify-center p-3">
            <LoadingSpinner />
          </div>
        )}
        {users.length > 0 && !selectedUser && !usersLoading && (
          <div className="flex flex-col gap-1 text-white">
            {users.map((user: User) => (
              <div
                key={user.email}
                className={`flex flex-col justify-center border border-neutral-700
                rounded-md p-2 cursor-pointer bg-transparent hover:bg-neutral-700`}
                onClick={() => setSelectedUser(user)}
              >
                <p className="font-semibold sm:text-sm text-[11px]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="sm:text-xs text-[10px] opacity-70">
                  {user.email}
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="w-full flex items-end gap-3">
            <div
              className="flex flex-1 flex-col justify-center 
                rounded-md p-2 bg-transparent "
            >
              <p className="font-semibold sm:text-sm text-[11px]">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p className="sm:text-xs text-[10px] opacity-70">
                {selectedUser?.email}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedUser(null);
              }}
              className="p-2 sm:text-xs text-[11px] text-primary-400 underline font-semibold hover:text-primary-600"
            >
              cancel
            </button>
          </div>
        )}
        {error && <p className="font-semibold text-xs text-red-500">{error}</p>}
        <button
          className={`${buttons} font-semibold w-full h-8 mt-4 bg-primary-500 transition
          hover:bg-primary-600 active:bg-primary-600 disabled:opacity-60
          disabled:cursor-not-allowed disabled:hover:bg-primary-500 disabled:active:bg-primary-500`}
          disabled={selectedUser === null || shareLoading}
          onClick={shareFile}
        >
          {shareLoading ? (
            <LoadingDots />
          ) : (
            <>
              Share
              <FaShare />
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
