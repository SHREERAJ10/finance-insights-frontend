import React from "react";

function FinanceEntryForm({
  selectedOption,
  placeholder,
  categoryId,
  amount,
  setFormData,
  fieldNames,
  setActiveId
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="w-[85%] md:max-w-100 bg-[#FAFAFA] px-5 pt-6 py-7 border border-[#EEEEEE] shadow-lg rounded-xl">
        <form className="flex flex-col gap-y-6">
          <div>
            <select
              name={fieldNames[0]}
              value={categoryId}
              className="w-full pl-5 py-2 focus:outline-none pr-1 placeholder:font-medium text-lg placeholder:text-xl rounded-xl border border-[#D3D3D3] placeholder:text-[#7C7C7C] text-[#272727"
              onChange={handleChange}
            >
              <option disabled>{selectedOption}</option>
              <option value="test1">test1</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
              <option value="test4">test4</option>
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
          <div className="flex items-center justify-between">
            <button className="bg-[#FBFBFB] text-[#414141] text-xl px-5 py-1.5 border border-[#D3D3D3] rounded-xl font-medium cursor-pointer" onClick={()=>setActiveId(null)}>
              Cancel
            </button>
            <button className="bg-[#272727] text-[#FBFBFB] text-xl px-5 py-1.5 border border-[#D3D3D3] rounded-xl font-medium cursor-pointer">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default FinanceEntryForm;
