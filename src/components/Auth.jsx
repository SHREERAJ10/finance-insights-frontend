import getIconFromName from "../utils/getIconFromName.jsx";

function Auth({
  formFields,
  submitText,
  formData,
  setFormData,
}) {

  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-5">
          {formFields.map((field) => {
            return (
              <div
                key={field.name}
                className="flex items-center gap-2 border border-[#D3D3D3] rounded-2xl bg-[#FBFBFB] pl-5 py-2 pr-1"
              >
                {getIconFromName(field.icon)}
                <input
                  name={field.name}
                  value={formData[field.id]}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="outline-none focus:outline-none text-xl placeholder:font-medium text-[#272727] w-full placeholder:text-[#7C7C7C]"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#272727] text-semibold text-xl w-full text-[#D9D9D9] rounded-xl cursor-pointer hover:brightness-110 transition-all duration-150 ease-in-out"
        >
          {submitText}
        </button>
      </div>
    </>
  );
}

export default Auth;
