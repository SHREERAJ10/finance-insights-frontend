import React, { useContext } from "react";
import { submitFinanceData } from "./DynamicForm.jsx";
import AuthContext from "@/context/AuthContext.jsx";

function FinanceCategoryForm({
  placeholder,
  category,
  formData,
  setFormData,
  fieldNames,
  setActiveId,
  route
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useContext(AuthContext);

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
          <div className="flex flex-col gap-y-4">
            <div>
              <input
                type="text"
                placeholder={placeholder}
                value={category}
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
                  value="1"
                  checked={formData.isFixed == "1"}
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
                  value="0"
                  checked={formData.isFixed == "0"}
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
              onClick={() =>{
                setFormData({}); //reset formData state when cancelled
                setActiveId(null); 
              }}
            >
              Cancel
            </button>
            <button type="submit" className="bg-[#272727] text-[#FBFBFB] text-xl px-5 py-1.5 border border-[#D3D3D3] rounded-xl font-medium cursor-pointer">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FinanceCategoryForm;
