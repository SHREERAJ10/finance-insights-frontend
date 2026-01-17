import { notifyUser, toastType } from "@/utils/ToastNotifications.js";
import React, { useEffect } from "react";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  onDelete,
  title = "Confirm Delete",
  message,
  setDataUpdated,
  deleteRoute,
  id,
  user,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden p-4">
      <div
        className="absolute inset-0 bg-[#3A3A3A]/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="animate-in fade-in duration-300 relative w-full max-w-100 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="px-8 pt-10 pb-8 text-center">
          <h2 className="text-[#1A1A1A] text-xl font-bold tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-[#6A6A6A] text-base leading-relaxed">
            {message ||
              "Are you sure you want to delete this item? This action cannot be undone."}
          </p>
        </div>

        <div className="flex border-t border-[#F0F0F0] h-14">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 text-[#757575] text-sm font-semibold hover:bg-[#FAFAFA] transition-colors border-r border-[#F0F0F0]"
          >
            Cancel
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const response = await onDelete(user, `${deleteRoute}${id}`);
              const responseText = await response.json();
              setDataUpdated(true);
              if (response.status == 200) {
                notifyUser(responseText.message, toastType.success);
              } else {
                notifyUser(responseText.error, toastType.warn);
              }
              setIsOpen(false);
            }}
            className="flex-1 text-[#1A1A1A] text-sm font-bold hover:bg-[#F5F5F5] transition-colors active:bg-[#EEEEEE]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
