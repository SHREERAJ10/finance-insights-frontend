import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext.jsx";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";

function FinanceCategoryForm({
  placeholder,
  category,
  formData,
  setFormData,
  fieldNames,
  setActiveId,
  route,
  submitAction,
  prefillCategory = "",
  prefillVariabilityType = "",
  setDataUpdated,
  submitText = "Add",
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (prefillCategory !== "") {
      setFormData((prev) => ({
        ...prev,
        [fieldNames[0]]: prefillCategory,
        [fieldNames[1]]: prefillVariabilityType ? "0" : "",
      }));
    }
  }, [prefillCategory, prefillVariabilityType, fieldNames, setFormData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="animate-in fade-in duration-300 w-[85%] md:max-w-100 bg-[#FAFAFA] px-5 pt-6 py-7 border border-[#b6b6b6] shadow-lg rounded-xl z-80">
        <form
          className="flex flex-col gap-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await submitAction(user, route, formData);
            const responseText = await response.json();
            if (setDataUpdated != undefined) {
              //only update during update/edit mode
              setDataUpdated(true);
            }
            if (response.status == 200) {
              notifyUser(responseText.message, toastType.success);
              setActiveId(null);
            } else {
              notifyUser(responseText.error, toastType.warn);
            }
          }}
        >
          <div className="flex flex-col gap-y-4">
            <div>
              <input
                type="text"
                placeholder={placeholder}
                value={formData[fieldNames[0]]}
                name={fieldNames[0]}
                className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727]"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-x-20">
              <div className="flex items-center gap-x-1.5">
                <input
                  type="radio"
                  name={fieldNames[1]}
                  id="fixed"
                  value="0"
                  checked={formData.isFixed == "0"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="fixed"
                  className="text-[#272727] font-medium text-xl"
                >
                  Fixed
                </label>
              </div>
              <div className="flex items-center gap-x-1.5">
                <input
                  type="radio"
                  name={fieldNames[1]}
                  id="variable"
                  value=""
                  checked={formData.isFixed == ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="variable"
                  className="text-[#272727] font-medium text-xl"
                >
                  Variable
                </label>
              </div>
            </div>
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
    </>
  );
}

export default FinanceCategoryForm;
