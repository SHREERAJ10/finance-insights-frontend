import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import { submitFinanceData } from "./DynamicForm.jsx";
import { inputDataType } from "./dynamicFormConfig.js";

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
}) {
  const handleChange = (e) => {
    console.log("handling change");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useContext(AuthContext);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
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
  }, []);

  console.log(categoryOptions);

  return (
    <>
      <div className="w-[85%] md:max-w-100 bg-[#FAFAFA] px-5 pt-6 py-7 border border-[#EEEEEE] shadow-lg rounded-xl">
        <form
          className="flex flex-col gap-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            submitFinanceData(user, route, formData);
          }}
        >
          <div>
            <select
              name={fieldNames[0]}
              value={categoryId}
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
              value={amount}
              className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727]"
              onChange={handleChange}
            />
          </div>
          {type == inputDataType.expenseData ? (
            <div>
              <textarea
                name={fieldNames[2]}
                placeholder="Expense Description"
                value={description}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default FinanceEntryForm;
