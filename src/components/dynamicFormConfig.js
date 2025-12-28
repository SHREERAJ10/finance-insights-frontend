import { BanknoteArrowDown, NotebookPen, PiggyBank } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import FinanceEntryForm from "./FinanceEntryForm.jsx";
import FinanceCategoryForm from "./FinanceCategoryForm.jsx";

export const inputDataType = {
    incomeData: "INCOME_DATA",
    expenseData: "EXPENSE_DATA",
    incomeSource: "INCOME_SOURCE",
    expenseCategory: "EXPENSE_CATEGORY",
    savingGoal: "SAVING_GOAL",
};

export const DYNAMIC_FORM_CONFIG = [
    {
        id: uuidv4(),
        name: "Expense Data",
        type: inputDataType.expenseData,
        icon: NotebookPen,
        initialData: { expenseCategoryId: "", expenseAmount: "" },
        fieldNames: ["expenseCategoryId", "expenseAmount"],
        content: {
            selectedOption: "Expense Category",
            placeholder: "Expense Amount",
        },
        inputBox: FinanceEntryForm,
    },
    {
        id: uuidv4(),
        name: "Expense Category",
        icon: BanknoteArrowDown,
        type: inputDataType.expenseCategory,
        initialData: { expenseCategory: "", variabilityType: "fixed" },
        fieldNames: ["expenseCategory", "variabilityType"],

        content: {
            placeholder: "Expense Category",
        },
        inputBox: FinanceCategoryForm,
    },
    {
        id: uuidv4(),
        name: "Income Data",
        icon: NotebookPen,
        initialData: { incomeSourceId: "", incomeAmount: "" },
        type: inputDataType.incomeData,
        fieldNames: ["incomeSourceId", "incomeAmount"],
        content: {
            selectedOption: "Income Source",
            placeholder: "Income Amount",
        },
        inputBox: FinanceEntryForm,
    },
    {
        id: uuidv4(),
        name: "Income Source",
        icon: BanknoteArrowDown,
        type: inputDataType.incomeSource,
        initialData: { incomeSource: "", variabilityType: "fixed" },
        fieldNames: ["incomeSource", "variabilityType"],
        content: {
            placeholder: "Income Source",
        },

        inputBox: FinanceCategoryForm,
    },
    {
        id: uuidv4(),
        name: "Set Saving Goal",
        icon: PiggyBank,
        type: inputDataType.savingGoal,
    },
]