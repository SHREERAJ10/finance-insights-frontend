import { Pencil, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import FinanceCategoryForm from "./FinanceCategoryForm.jsx";
import { DYNAMIC_FORM_CONFIG } from "./dynamicFormConfig.js";
import AuthContext from "@/context/AuthContext.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { onDelete, updateFinanceData } from "@/utils/api.js";

function CategoryRow({
  setDataUpdated,
  category,
  variabilityType,
  id,
  type,
  deleteRoute,
}) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [isEditActive, setIsEditActive] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      {isEditActive &&
        DYNAMIC_FORM_CONFIG.map((item) => {
          if (item.type == type) {
            return (
              <div className="fixed inset-0 z-50 overflow-hidden">
                <div
                  className="absolute inset-0 bg-[#3A3A3A] opacity-30"
                  onClick={() => setIsEditActive(false)}
                ></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4 flex justify-center">
                  <FinanceCategoryForm
                    key={item.id}
                    placeholder={item.content.placeholder}
                    category={formData[item.fieldNames[0]] ?? ""}
                    prefillCategory={category}
                    prefillVariabilityType={variabilityType}
                    formData={formData}
                    setFormData={setFormData}
                    fieldNames={item.fieldNames}
                    route={`${item.editRoute}${id}`}
                    setActiveId={setIsEditActive}
                    submitAction={updateFinanceData}
                    setDataUpdated={setDataUpdated}
                    submitText="Update"
                  />
                </div>
              </div>
            );
          }
        })}

        {isDeleteOpen && <DeleteModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} onDelete={onDelete} id={id} deleteRoute={deleteRoute} setDataUpdated={setDataUpdated} user={user} message="Are you sure you want to delete this? If you delete this, all the records associated with this category will also be deleted." />}

      <div className="flex flex-col sm:flex-row sm:items-center w-full border-b border-[#EEEEEE] bg-white hover:bg-[#F9F9F9] transition-all px-6 group">

  <div className="flex items-center gap-4 flex-1 min-w-0 py-4">
    <span className="text-[17px] font-semibold text-[#272727] truncate tracking-tight">
      {category}
    </span>

    <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] bg-[#EFEFEF] text-[#757575] rounded font-bold uppercase tracking-widest">
      {variabilityType ? "Fixed" : "Variable"}
    </span>
  </div>
  <div className="flex items-center gap-1 mt-2 sm:mt-0 sm:ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    <button
      onClick={() => setIsEditActive(true)}
      className="p-2.5 text-[#757575] hover:text-[#272727] hover:bg-[#EFEFEF] rounded-full transition-all"
      title="Edit Category"
    >
      <Pencil size={18} />
    </button>
    <button
      onClick={() => setIsDeleteOpen(true)}
      className="p-2.5 text-[#757575] hover:text-[#272727] hover:bg-[#EFEFEF] rounded-full transition-all"
      title="Delete Category"
    >
      <Trash2 size={18} />
    </button>
  </div>
</div>
    </>
  );
}

export default CategoryRow;
