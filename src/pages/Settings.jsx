import { fetchCategoryData } from "@/utils/api.js";
import CategoryRow from "@/components/CategoryRow.jsx";
import { inputDataType } from "@/components/dynamicFormConfig.js";
import LoadingDots from "@/components/LoadingDots.jsx";
import SavingGoalDisplay from "@/components/SavingGoalDisplay.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";

function Settings() {
  const { user } = useContext(AuthContext);
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIncomeSources(await fetchCategoryData(user, "income/source"));
      setExpenseCategories(await fetchCategoryData(user, "expense/category"));
      setDataUpdated(false);
      setIsLoading(false);
    })();
  }, [dataUpdated]);

  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <section className="max-w-5xl px-5 pt-8 flex flex-col mx-auto gap-y-0">
            <h1 className="text-2xl text-[#272727] font-medium tracking-wide">
              Settings
            </h1>
            <SavingGoalDisplay user={user} />

            <section className="w-full max-w-5xl mx-auto py-8 px-4">
              <div className="flex items-center justify-between mb-6 border-b border-[#EEEEEE] pb-4">
                <h2 className="text-sm uppercase tracking-[0.2em] text-[#757575] font-bold">
                  Income Source
                </h2>
                <span className="text-xs text-[#BCBCBC] font-medium">
                  {incomeSources.length} Items
                </span>
              </div>

              <div className="flex flex-col border border-[#EEEEEE] rounded-xl overflow-hidden bg-white shadow-sm">
                {incomeSources.length > 0 ? (
                  incomeSources.map((incomeSource) => (
                    <CategoryRow
                      key={incomeSource.id}
                      initialData={incomeSource}
                      category={incomeSource.incomeSource}
                      variabilityType={incomeSource.isFixed}
                      id={incomeSource.id}
                      type={inputDataType.incomeSource}
                      setDataUpdated={setDataUpdated}
                      deleteRoute="income/source/"
                    />
                  ))
                ) : (
                  <div className="py-12 text-center text-[#757575] text-sm italic">
                    No income sources found.
                  </div>
                )}
              </div>
            </section>

            <section className="w-full max-w-5xl mx-auto py-8 px-4">
              <div className="flex items-center justify-between mb-6 border-b border-[#EEEEEE] pb-4">
                <h2 className="text-sm uppercase tracking-[0.2em] text-[#757575] font-bold">
                  Expense Category
                </h2>
                <span className="text-xs text-[#BCBCBC] font-medium">
                  {expenseCategories.length} Items
                </span>
              </div>
              <div className="flex flex-col border border-[#EEEEEE] rounded-xl overflow-hidden bg-white shadow-sm">
                {expenseCategories.length > 0 ? (
                  expenseCategories.map((expenseCategory) => {
                    return (
                      <CategoryRow
                        key={expenseCategory.id}
                        category={expenseCategory.expenseCategory}
                        variabilityType={expenseCategory.isFixed}
                        id={expenseCategory.id}
                        type={inputDataType.expenseCategory}
                        setDataUpdated={setDataUpdated}
                        deleteRoute="expense/category/"
                      />
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-[#757575] text-sm italic">
                    No expense categories found.
                  </div>
                )}
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
}

export default Settings;
