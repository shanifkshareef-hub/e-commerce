import React from "react";
export interface IToastMessage {
  content: string;
  description?: string;
}
const ToastMessage: React.FC<IToastMessage> = ({ content, description }) => {
  return (
    <div>
      <p className="">{content}</p>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default ToastMessage;
