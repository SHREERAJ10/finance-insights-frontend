;
import { formatCurrency } from "@/utils/formatCurrency.js";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DYNAMIC_FORM_CONFIG, inputDataType } from "./dynamicFormConfig.js";
import SavingGoalForm from "./SavingGoalForm.jsx";
import { fetchData, updateFinanceData } from "@/utils/api.js";

const monthAndYear = (date) => {
  const validDate = new Date(date);
  return validDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  });
};

function SavingGoalDisplay({ user }) {
  const [savingGoalData, setSavingGoalData] = useState({});
  const [isEditActive, setIsEditActive] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetchData(user, "http://localhost:3000/saving");
      setSavingGoalData(response.data || {});
      setDataUpdated(false);
    })();
  }, [dataUpdated]);

  return (
    <>
    {isEditActive &&
        DYNAMIC_FORM_CONFIG.map((item) => {
          if (item.type == inputDataType.savingGoal) {
            return (

              <div className="fixed inset-0 z-50 overflow-hidden">
                {/* backdrop */}
                <div
                  className="absolute inset-0 bg-[#3A3A3A]/40 backdrop-blur-sm"
                  onClick={() => setIsEditActive(false)}
                ></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4 flex justify-center">
                  <SavingGoalForm
                    placeholder={item.content.placeholder}
                    fieldNames={item.fieldNames}
                    formData={formData}
                    setFormData={setFormData}
                    setActiveId={setIsEditActive}
                    route={`${item.editRoute}${savingGoalData.savingGoalId}`}
                    prefillAmount={savingGoalData.savingGoalAmount}
                    submitAction={updateFinanceData}
                    setDataUpdated={setDataUpdated}
                    submitText="Update"
                  />
                </div>
              </div>
            );
          }
        })}
      <div className="flex flex-col gap-y-3 py-8 px-4 border-b border-[#EEEEEE] group">
        <div className="flex justify-between items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#757575] font-bold">
            Saving Goal
          </p>

          <button
          disabled={Object.keys(savingGoalData).length == 0}
            onClick={() => setIsEditActive(true)}
            className="p-2 -mr-2 text-[#757575] hover:text-[#272727] hover:bg-[#F5F5F5] rounded-full transition-all duration-200 disabled:text-[#a6a6a6]"
            title="Edit Goal"
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tighter">
            {Object.keys(savingGoalData).length>0?formatCurrency(savingGoalData.savingGoalAmount):`Add Saving Goal to get started`}
          </h1>

          <div className="flex flex-col items-end text-right">
            <span className="text-[#3A3A3A] text-xs font-bold uppercase tracking-wide">
              Target Set
            </span>
            <span className="text-[#757575] text-sm font-medium">
              {Object.keys(savingGoalData).length>0?monthAndYear(savingGoalData.createdAt):`Saving Goal hasn't been Set`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SavingGoalDisplay;
