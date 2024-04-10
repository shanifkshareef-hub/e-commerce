import React from "react";
import { FaChevronLeft } from "react-icons/fa";

export interface Props {
  title: string;
  onBack?(): void;
}
const PageTitle: React.FC<Props> = ({ title, onBack }) => {
  return (
    <div className="text-gray-200 flex space-x-1 items-center text-2xl pb-4">
      {onBack && (
        <FaChevronLeft onClick={onBack} className="text-xl cursor-pointer" />
      )}
      <h2 className="text-2xl font-bold tracking-tight text-gray-200">
        {title}
      </h2>
    </div>
  );
};

export default PageTitle;
