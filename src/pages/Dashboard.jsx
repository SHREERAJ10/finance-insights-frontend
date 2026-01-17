import React, { useState } from "react";
import { DataDropdown } from "@/components/DataDropdown.jsx";
import { DYNAMIC_FORM_CONFIG } from "@/components/dynamicFormConfig.js";
import DynamicForm from "@/components/DynamicForm.jsx";

function Dashboard() {
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({});

  return (
    <>
      <div className="flex flex-col gap-y-16">
        <section className="flex justify-center pt-16">
          <DataDropdown
            dropdownItems={DYNAMIC_FORM_CONFIG}
            setActiveId={setActiveId}
          />
        </section>
        <div className="w-full flex justify-center">
          {DYNAMIC_FORM_CONFIG.map((item) => {
            if (item.id == activeId) {
              return (
                <DynamicForm
                  key={item.id}
                  setActiveId={setActiveId}
                  initialData={item.initialData}
                  inputType={item.type}
                  fieldNames={item.fieldNames}
                  {...item.content}
                  route={item.route}
                  formData={formData}
                  setFormData={setFormData}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
