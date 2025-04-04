"use client";
import React from "react";

type WeatherAlertToastProps = {
  city: string;
};

const WeatherAlertToast: React.FC<WeatherAlertToastProps> = ({ city }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl text-yellow-900 shadow-md">
      🌩️ Weather Alert [{city}]: Sudden temperature drop!
    </div>
  );
};

export default WeatherAlertToast;
