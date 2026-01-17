import React, { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext.jsx";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";

function SavingGoalForm({
  placeholder,
  fieldNames,
  amount,
  setActiveId,
  route,
  formData,
  setFormData,
  submitAction,
  submitText = "Add",
  prefillAmount,
  setDataUpdated,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (prefillAmount !== "") {
      setFormData((prev) => ({
        ...prev,
        [fieldNames[0]]: prefillAmount || "0",
      }));
    }
  }, [prefillAmount, fieldNames, setFormData]);

  return (
    <div className="animate-in fade-in duration-300 w-[85%] md:max-w-100 bg-[#FAFAFA] px-5 pt-6 py-7 border border-[#EEEEEE] shadow-lg rounded-xl">
      <form
        className="flex flex-col gap-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await submitAction(user, route, formData);
          const responseText = await response.json();
          if (response.status == 200) {
            notifyUser(responseText.message, toastType.success);
            setDataUpdated(true);
            setActiveId(null);
          } else {
            notifyUser(responseText.error, toastType.warn);
          }
        }}
      >
        <div>
          <input
            type="text"
            placeholder={placeholder}
            name={fieldNames[0]}
            value={formData[fieldNames[0]]}
            className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727]"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-[#FBFBFB] text-[#414141] text-xl px-5 py-1.5 border border-[#D3D3D3] rounded-xl font-medium cursor-pointer"
            onClick={() => {
              setFormData({}); //reset formData state when cancelled
              setActiveId(null);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#272727] text-[#FBFBFB] text-xl px-5 py-1.5 border border-[#D3D3D3] rounded-xl font-medium cursor-pointer"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SavingGoalForm;
