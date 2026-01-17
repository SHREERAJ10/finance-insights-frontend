import DataCard from "@/components/DataCard.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inputDataType } from "../components/dynamicFormConfig.js";
import { fetchCategoryData, fetchData } from "@/utils/api.js";
import { scrollToTop } from "@/utils/scrollToTop.js";
import LoadingDots from "@/components/LoadingDots.jsx";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";

function DataPage() {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  //categories used for filtering data according to category
  const [categoryOptions, setCategoryOptions] = useState([]);

  //categoryId used for filtering data according to category
  const [categoryId, setCategoryId] = useState("");
  const [sortType, setSortType] = useState("asc");

  //currently active tab
  const [activeTab, setActiveTab] = useState("EXPENSE_DATA");

  const [dataUpdated, setDataUpdated] = useState(false);

  const currPage = Number(searchParams.get("page")) || 1;
  const currCategory = categoryId || searchParams.get("category") || "";
  const currSort = sortType || searchParams.get("sort");

  const [incomeData, setIncomeData] = useState({});
  const [expenseData, setExpenseData] = useState({});

  const updatePage = (newPage, newCategory = "", newSortType = "") => {
    let validParams = {
      page: newPage.toString(),
    };
    if (newCategory.toString().trim() != "") {
      validParams.category = newCategory.toString();
    }
    if (newSortType.toString().trim() != "") {
      validParams.sort = newSortType.toString();
    }
    setSearchParams(validParams);
  };

  const goToPreviousPage = () => {
    if (currPage > 1) {
      updatePage(currPage - 1);
    }
  };

  const goToNextPage = () => {
    if (activeTab == "EXPENSE_DATA" && expenseData.totalCount > 10 * currPage) {
      updatePage(currPage + 1);
    } else if (
      activeTab == "INCOME_DATA" &&
      incomeData.totalCount > 10 * currPage
    ) {
      updatePage(currPage + 1);
    }
  };

  //effect that runs everytime tab changes or page changes
  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        switch (activeTab) {
          case "EXPENSE_DATA":
            setExpenseData(
              await fetchData(
                user,
                `https://finance-insights-backend.onrender.com/expense/data${`?${searchParams.toString()}`}`
              )
            );
            setCategoryOptions(
              await fetchCategoryData(user, "expense/category")
            );
            break;
          case "INCOME_DATA":
            setIncomeData(
              await fetchData(
                user,
                `https://finance-insights-backend.onrender.com/income/data?${`?${searchParams.toString()}`}`
              )
            );
            setCategoryOptions(await fetchCategoryData(user, "income/source"));
            break;
        }
        setDataUpdated(false);
        setIsLoading(false);
        scrollToTop();
      })();
    } catch (err) {
      console.log(err);
      notifyUser("Some Error Occured", toastType.warn);
    }
  }, [searchParams, activeTab, dataUpdated]);

  return (
    <section className="w-full max-w-5xl px-5 mx-auto">
      <div className="flex flex-col gap-y-5 pt-4">
        <div className="flex items-center justify-between w-full py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <select
              name="category"
              value={categoryId}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-base font-medium text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none cursor-pointer min-w-35"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Category: None
              </option>
              {categoryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {activeTab === inputDataType.incomeData
                    ? option.incomeSource
                    : option.expenseCategory}
                </option>
              ))}
            </select>

            <select
              name="sort"
              id="sort"
              value={sortType}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-base font-medium text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none cursor-pointer"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="asc">Latest</option>
              <option value="desc">Oldest</option>
            </select>
          </div>
          <button
            className="bg-[#272727] text-[#FBFBFB] px-6 py-2 rounded-lg text-base tracking-wider hover:brightness-110 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => updatePage(currPage, currCategory, currSort)}
          >
            Apply
          </button>
        </div>

        <Tabs
          defaultValue="EXPENSE_DATA"
          className="w-full gap-y-12"
          onValueChange={(currTab) => {
            setActiveTab(currTab);
            updatePage(1); //reset on tab change
            setCategoryId(""); //reset on tab change
          }}
        >
          <div className="flex justify-center">
            <TabsList className="w-full max-w-150 grid grid-cols-2 h-12 items-center justify-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
              <TabsTrigger
                value="EXPENSE_DATA"
                className="rounded-full px-8 py-2 text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Expense
              </TabsTrigger>
              <TabsTrigger
                value="INCOME_DATA"
                className="rounded-full px-8 py-2 text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Income
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="EXPENSE_DATA"
            className="flex flex-col gap-y-8 items-center"
          >
            {activeTab == "EXPENSE_DATA" ? (
              isLoading ? (
                <LoadingDots />
              ) : Object.keys(expenseData).length > 0 &&
                expenseData.items.length > 0 ? (
                expenseData.items.map((item) => {
                  return (
                    <>
                      <DataCard
                        key={item.expenseId}
                        amount={item.expenseAmount}
                        description={item.expenseDescription}
                        category={item.expenseCategory.expenseCategory}
                        prefillCategoryId={item.expenseCategoryId}
                        date={item.createdAt}
                        variabilityType={
                          item.expenseCategory.isFixed ? "Fixed" : "Variable"
                        }
                        type="EXPENSE_DATA"
                        id={item.expenseId}
                        setDataUpdated={setDataUpdated}
                        deleteRoute="expense/data/"
                      />
                    </>
                  );
                })
              ) : (
                <p className="font-medium text-lg">No Data to Show here!</p>
              )
            ) : null}
          </TabsContent>
          <TabsContent
            value="INCOME_DATA"
            className="flex flex-col gap-y-8 items-center"
          >
            {activeTab == "INCOME_DATA" ? (
              isLoading ? (
                <LoadingDots />
              ) : Object.keys(incomeData).length > 0 &&
                incomeData.items.length > 0 ? (
                incomeData.items.map((item) => {
                  return (
                    <>
                      <DataCard
                        key={item.incomeId}
                        amount={item.incomeAmount}
                        category={item.incomeSource.incomeSource}
                        date={item.createdAt}
                        variabilityType={
                          item.incomeSource.isFixed ? "Fixed" : "Variable"
                        }
                        type="INCOME_DATA"
                        id={item.incomeId}
                        setDataUpdated={setDataUpdated}
                        prefillCategoryId={item.incomeSourceId}
                        deleteRoute="income/data/"
                      />
                    </>
                  );
                })
              ) : (
                <p className="font-medium text-lg">No Data to Show here!</p>
              )
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-around items-center py-8">
        <button
          onClick={goToPreviousPage}
          className="px-5 py-2.5 bg-[#272727] text-[#FBFBFB] text-lg tracking-wider rounded-xl cursor-pointer hover:brightness-110 transition-all duration-150 ease-in-out font-light text-start"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="px-5 py-2.5 bg-[#272727] text-[#FBFBFB] text-lg tracking-wider rounded-xl cursor-pointer hover:brightness-110 transition-all duration-150 ease-in-out font-light text-end"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default DataPage;
