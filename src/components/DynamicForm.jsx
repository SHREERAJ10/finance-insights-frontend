import React, { useEffect } from "react";
import { inputDataType } from "./dynamicFormConfig.js";
import FinanceEntryForm from "./FinanceEntryForm.jsx";
import FinanceCategoryForm from "./FinanceCategoryForm.jsx";

function DynamicForm({
  inputType,
  placeholder,
  selectedOption,
  initialData,
  fieldNames,
  formData,
  setFormData,
  setActiveId,
}) {
  useEffect(() => {
    setFormData(initialData);
  }, []);

  const commonProps = {
    placeholder: placeholder,
    fieldNames: fieldNames,
    setFormData: setFormData,
    setActiveId: setActiveId,
  };

  const renderForm = () => {
    if (Object.keys(formData).length > 0) {
      switch (inputType) {
        case inputDataType.incomeData:
          return (
            <FinanceEntryForm
              {...commonProps}
              selectedOption={selectedOption}
              amount={formData.incomeAmount}
              categoryId={formData.incomeSourceId}
            />
          );

        case inputDataType.expenseData:
          return (
            <FinanceEntryForm
              {...commonProps}
              selectedOption={selectedOption}
              amount={formData.expenseAmount}
              categoryId={formData.expenseCategoryId}
            />
          );

        case inputDataType.incomeSource:
          return (
            <FinanceCategoryForm
              {...commonProps}
              formData={formData}
              category={formData.expenseCategory}
            />
          );

        case inputDataType.expenseCategory:
          return (
            <FinanceCategoryForm
              {...commonProps}
              formData={formData}
              category={formData.incomeSource}
            />
          );

        default:
          return null;
      }
    }
  };

  return <>
    {renderForm()}
  </>;
}

export default DynamicForm;
