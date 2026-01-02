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
        initialData: { expenseCategoryId: "", expenseAmount: "", expenseDescription:"" },
        fieldNames: ["expenseCategoryId", "expenseAmount", "expenseDescription"],
        content: {
            selectedOption: "Expense Category",
            placeholder: "Expense Amount",
        },
        route:"expense/data",
        inputBox: FinanceEntryForm,
    },
    {
        id: uuidv4(),
        name: "Expense Category",
        icon: BanknoteArrowDown,
        type: inputDataType.expenseCategory,
        initialData: { expenseCategory: "", isFixed: "1" },
        fieldNames: ["expenseCategory", "isFixed"],

        content: {
            placeholder: "Expense Category",
        },
        route:"expense/category",
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
        route:"income/data",
        inputBox: FinanceEntryForm,
    },
    {
        id: uuidv4(),
        name: "Income Source",
        icon: BanknoteArrowDown,
        type: inputDataType.incomeSource,
        initialData: { incomeSource: "", isFixed: "1" },
        fieldNames: ["incomeSource", "isFixed"],
        content: {
            placeholder: "Income Source",
        },
        route:"income/source",
        inputBox: FinanceCategoryForm,
    },
    {
        id: uuidv4(),
        name: "Set Saving Goal",
        icon: PiggyBank,
        type: inputDataType.savingGoal,
    },
]