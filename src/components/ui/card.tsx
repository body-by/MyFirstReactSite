import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-gray-100 p-4 rounded-lg shadow">{children}</div>;
};

export default Card;
