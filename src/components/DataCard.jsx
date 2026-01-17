import { Pencil, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { DYNAMIC_FORM_CONFIG } from "./dynamicFormConfig.js";
import FinanceEntryForm from "./FinanceEntryForm.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { formatCurrency } from "@/utils/formatCurrency.js";
import { onDelete, updateFinanceData } from "@/utils/api.js";

function DataCard({
  amount,
  description = "",
  date,
  category,
  variabilityType,
  type,
  id,
  setDataUpdated,
  prefillCategoryId,
  deleteRoute,
}) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const [formData, setFormData] = useState({});
  const { user } = useContext(AuthContext);

  const fullDate = new Date(date).toLocaleDateString("en-US", options);

  return (
    <>
      {isEditActive &&
        DYNAMIC_FORM_CONFIG.map((item) => {
          if (item.type == type) {
            return (

              <div className="fixed inset-0 z-50 overflow-hidden">
                {/* backdrop */}
                <div
                  className="absolute inset-0 bg-[#3A3A3A]/40 backdrop-blur-sm"
                  onClick={() => setIsEditActive(false)}
                ></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4 flex justify-center">
                  <FinanceEntryForm
                    placeholder={item.content.placeholder}
                    fieldNames={item.fieldNames}
                    formData={formData}
                    setFormData={setFormData}
                    setActiveId={setIsEditActive}
                    route={`${item.editRoute}${id}`}
                    prefillSelectedOption={item.content.selectedOption}
                    prefillAmount={amount}
                    prefillDescription={description}
                    prefillCategoryId={prefillCategoryId ?? ""}
                    categoryRoute={item.categoryRoute}
                    type={type}
                    submitAction={updateFinanceData}
                    setDataUpdated={setDataUpdated}
                    submitText="Update"
                  />
                </div>
              </div>
            );
          }
        })}

        {isDeleteOpen && <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} onDelete={onDelete} id={id} deleteRoute={deleteRoute} setDataUpdated={setDataUpdated} user={user} />}

      <div className="animate-in fade-in duration-300 w-full max-w-112.5 bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all">
        <div
          className={`px-5 py-4 flex justify-between items-center ${
            description ? "border-b border-[#F0F0F0]" : ""
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="px-2.5 py-0.5 w-fit text-[11px] bg-[#EFEFEF] text-[#3A3A3A] rounded-md font-bold tracking-wider uppercase">
              {category}
            </span>
            {!description && (
              <div className="flex items-center gap-2 text-[#6A6A6A] text-sm font-medium mt-1">
                <span>{fullDate}</span>
                <span className="w-1 h-1 bg-[#BCBCBC] rounded-full"></span>
                <span className="italic">{variabilityType.toLowerCase()}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Pencil
              size={18}
              className="text-[#434343] hover:text-[#272727] transition-colors cursor-pointer"
              onClick={() => setIsEditActive(true)}
            />
            <Trash2
              size={18}
              className="text-[#434343] hover:text-[#272727] transition-colors cursor-pointer"
              onClick={() => {
                setIsDeleteOpen(true)
              }}
            />
          </div>
        </div>

        {description && (
          <div className="px-5 py-6">
            <p className="text-lg text-[#272727] font-normal leading-relaxed">
              {description}
            </p>
          </div>
        )}

        <div
          className={`px-5 py-4 bg-[#F2F2F2]/50 flex items-center justify-between ${
            description
              ? "border-t border-[#F0F0F0]"
              : "pt-0 pb-5 bg-transparent"
          }`}
        >
          {description ? (
            <>
              <div className="flex items-center gap-2 text-[#6A6A6A] text-sm font-medium">
                <span>{fullDate}</span>
                <span className="w-1 h-1 bg-[#BCBCBC] rounded-full"></span>
                <span className="capitalize italic">
                  {variabilityType.toLowerCase()}
                </span>
              </div>
              <span className="text-[#272727] text-xl font-bold tracking-tight">
                {formatCurrency(amount)}
              </span>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <span className="text-[#272727] text-2xl font-bold tracking-tight">
                {formatCurrency(amount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DataCard;
