import { BanknoteArrowDown, NotebookPen, PiggyBank } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import FinanceEntryForm from "./FinanceEntryForm.jsx";
import FinanceCategoryForm from "./FinanceCategoryForm.jsx";
import SavingGoalForm from "./SavingGoalForm.jsx";

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
        editRoute:"expense/data/",
        deleteRoute:"expense/data/",
        inputBox: FinanceEntryForm,
        categoryRoute:"expense/category"
    },
    {
        id: uuidv4(),
        name: "Expense Category",
        icon: BanknoteArrowDown,
        type: inputDataType.expenseCategory,
        initialData: { expenseCategory: "", isFixed: "0" },
        fieldNames: ["expenseCategory", "isFixed"],

        content: {
            placeholder: "Expense Category",
        },
        route:"expense/category",
        editRoute:"expense/category/",
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
        editRoute:"income/data/",
        categoryRoute:"income/source",
        deleteRoute:"income/data/",
        inputBox: FinanceEntryForm,
    },
    {
        id: uuidv4(),
        name: "Income Source",
        icon: BanknoteArrowDown,
        type: inputDataType.incomeSource,
        initialData: { incomeSource: "", isFixed: "0" },
        fieldNames: ["incomeSource", "isFixed"],
        content: {
            placeholder: "Income Source",
        },
        route:"income/source",
        editRoute:"income/source/",
        inputBox: FinanceCategoryForm,
    },
    {
        id: uuidv4(),
        name: "Set Saving Goal",
        icon: PiggyBank,
        type: inputDataType.savingGoal,
        initialData: { savingGoalAmount: "0", },
        fieldNames: ["savingGoalAmount"],
        content: {
            placeholder: "Saving Goal Amount",
        },
        route:"saving",
        editRoute:"saving/",
        inputBox: SavingGoalForm,
    },
]