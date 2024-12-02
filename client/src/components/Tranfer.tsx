import React, { useState } from "react";
type Item = string;

const Transfer:React.FC = () => {
  const [sourceList, setSourceList] = useState<Item[]>(["Item 1", "Item 2", "Item 3"]);
  const [targetList, setTargetList] = useState<Item[]>([]);

  const moveToTarget = (item:Item):void => {
    setSourceList(sourceList.filter((i) => i !== item));
    setTargetList([...targetList, item]);
  };

  const moveToSource = (item:Item):void => {
    setTargetList(targetList.filter((i) => i !== item));
    setSourceList([...sourceList, item]);
  };

  return (
    <div className="flex gap-4">
      {/* Source List */}
      <div className="flex flex-col items-center border rounded-lg p-4 w-1/2 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Source</h2>
        <ul className="w-full space-y-2">
          {sourceList.map((item) => (
            <li
              key={item}
              className="bg-white border rounded px-4 py-2 flex justify-between items-center shadow"
            >
              {item}
              <button
                onClick={() => moveToTarget(item)}
                className="text-blue-500 hover:underline"
              >
                →
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Target List */}
      <div className="flex flex-col items-center border rounded-lg p-4 w-1/2 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Target</h2>
        <ul className="w-full space-y-2">
          {targetList.map((item) => (
            <li
              key={item}
              className="bg-white border rounded px-4 py-2 flex justify-between items-center shadow"
            >
              {item}
              <button
                onClick={() => moveToSource(item)}
                className="text-red-500 hover:underline"
              >
                ←
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transfer;
