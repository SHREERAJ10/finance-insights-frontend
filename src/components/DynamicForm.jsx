import React, { useEffect } from "react";
import { inputDataType } from "./dynamicFormConfig.js";
import FinanceEntryForm from "./FinanceEntryForm.jsx";
import FinanceCategoryForm from "./FinanceCategoryForm.jsx";
import SavingGoalForm from "./SavingGoalForm.jsx";
import { submitFinanceData } from "@/utils/api.js";

function DynamicForm({
  inputType,
  placeholder,
  selectedOption,
  initialData,
  fieldNames,
  formData,
  setFormData,
  setActiveId,
  route
}) {
  useEffect(() => {
    setFormData(initialData);
  }, []);

  const commonProps = {
    placeholder: placeholder,
    fieldNames: fieldNames,
    setFormData: setFormData,
    setActiveId: setActiveId,
    formData:formData,
    route: route,
    submitAction:submitFinanceData
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
              categoryRoute="income/source"
              type={inputType}
            />
          );

        case inputDataType.expenseData:
          return (
            <FinanceEntryForm
              {...commonProps}
              selectedOption={selectedOption}
              amount={formData.expenseAmount}
              description={formData.expenseDescription}
              categoryId={formData.expenseCategoryId}
              categoryRoute="expense/category"
              type={inputType}
            />
          );

        case inputDataType.incomeSource:
          return (
            <FinanceCategoryForm
              {...commonProps}
              category={formData.expenseCategory}
            />
          );

        case inputDataType.expenseCategory:
          return (
            <FinanceCategoryForm
              {...commonProps}
              category={formData.expenseCategory}
            />
          );
        case inputDataType.savingGoal:
          return (
            <SavingGoalForm
              {...commonProps}
              amount = {formData.savingGoalAmount}
            />
          );


        default:
          return null;
      }
    }
  };

  return <>{renderForm()}</>;
}

export default DynamicForm;
