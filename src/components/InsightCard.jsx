function InsightCard({ insights, subData, type }) {
  return (
    <div className="mx-auto w-[90%] max-w-112.5 bg-[#F9F9F9] border border-[#EAEAEA] rounded-3xl p-8 flex flex-col justify-between min-h-87.5 shadow-xl">
      <div className="flex flex-col gap-y-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#757575] font-bold">
          {type}
        </span>

        <div className="flex flex-col gap-y-3">
          {insights.map((insight, index) => (
            <p
              key={index}
              className="text-[#272727] text-xl font-medium leading-snug"
              dangerouslySetInnerHTML={{ __html: insight }}
            />
          ))}
        </div>

        {subData && subData.length > 0 && (
          <div className="flex flex-col gap-y-2 pt-2">
            {subData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-baseline gap-x-2 text-base"
                >
                  <span className="text-[#757575] font-medium whitespace-nowrap">
                    {item.key}:
                  </span>
                  <span className="text-[#272727] font-semibold">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-12 h-1 bg-[#3A3A3A] rounded-full mt-8"></div>
    </div>
  );
}

export default InsightCard;
