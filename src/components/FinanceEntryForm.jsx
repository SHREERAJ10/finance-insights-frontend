import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import { inputDataType } from "./dynamicFormConfig.js";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";

function FinanceEntryForm({
  selectedOption,
  placeholder,
  categoryId,
  amount,
  setFormData,
  fieldNames,
  setActiveId,
  categoryRoute,
  route,
  formData,
  type,
  description,
  submitAction,
  setDataUpdated,
  prefillSelectedOption,
  prefillAmount,
  prefillDescription,
  prefillCategoryId,
  submitText="Add",
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useContext(AuthContext);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (prefillAmount !== "") {
      setFormData((prev) => ({
        ...prev,
        [fieldNames[0]]: prefillCategoryId,
        [fieldNames[1]]: prefillAmount || "0",
        [fieldNames[2]]: prefillDescription || "",
      }));
    }
  }, [
    prefillCategoryId,
    prefillAmount,
    fieldNames,
    setFormData,
    prefillDescription,
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchCategoryData = async () => {
      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:3000/${categoryRoute}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      setCategoryOptions((await response.json()).data);
    };
    fetchCategoryData();
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="animate-in fade-in duration-300 w-[85%] md:max-w-100 bg-[#FAFAFA] px-5 pt-6 py-7 border border-[#b6b6b6] shadow-lg rounded-xl">
        <form
          className="flex flex-col gap-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await submitAction(user, route, formData);
            const responseText = await response.json();
            if (setDataUpdated != undefined) {
              //only update when editing/updating data
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
          <div>
            <select
              name={fieldNames[0]}
              value={formData[fieldNames[0]]}
              className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727"
              onChange={handleChange}
            >
              <option value="" disabled>
                {selectedOption}
              </option>
              {categoryOptions.map((option) => {
                return (
                  <option key={option.id} value={option.id}>
                    {type == inputDataType.incomeData
                      ? option.incomeSource
                      : type == inputDataType.expenseData
                      ? option.expenseCategory
                      : null}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder={placeholder}
              name={fieldNames[1]}
              value={formData[fieldNames[1]]}
              className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727]"
              onChange={handleChange}
            />
          </div>
          {type == inputDataType.expenseData ? (
            <div>
              <textarea
                name={fieldNames[2]}
                placeholder="Expense Description"
                value={formData[fieldNames[2]]}
                className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727]"
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          ) : null}

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
export default FinanceEntryForm;
