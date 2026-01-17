import React from 'react';
import { PencilLine } from 'lucide-react'; // Optional icon library

const SavingGoalRow = ({ month, year, goalAmount, onEdit }) => {
  return (
    <tr className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {month}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {year}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
        ${goalAmount.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-all border border-gray-200"
        >
          <PencilLine size={14} />
          Edit
        </button>
      </td>
    </tr>
  );
};

export default SavingGoalRow;