import React from 'react';

interface StatusIndicatorProps {
  error: string | null;
  isLoading?: boolean;
  pageRendered?: boolean;
}

interface StatusState {
  visibility: string;
  color: string;
  animation: string;
  text: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  dotLight: string;
  dotDark: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  error,
  isLoading,
  pageRendered
}) => {
  let status: StatusState = {
    visibility: "hidden lg:block",
    color: "green",
    animation: "",
    text: "Ready",
    bgLight: "bg-green-100",
    bgDark: "dark:bg-green-900",
    textLight: "text-green-800",
    textDark: "dark:text-green-200",
    dotLight: "bg-lime-600",
    dotDark: "dark:bg-lime-300"
  };

  if (error) {
    status = {
      visibility: "block",
      color: "red",
      animation: "",
      text: "Error",
      bgLight: "bg-red-100",
      bgDark: "dark:bg-red-900",
      textLight: "text-red-800",
      textDark: "dark:text-red-200",
      dotLight: "bg-red-600",
      dotDark: "dark:bg-red-300"
    };
  } else if (!pageRendered) {
    status = {
      visibility: "block",
      color: "purple",
      animation: "animate-ping",
      text: "Initializing...",
      bgLight: "bg-purple-100",
      bgDark: "dark:bg-purple-900",
      textLight: "text-purple-800",
      textDark: "dark:text-purple-200",
      dotLight: "bg-purple-600",
      dotDark: "dark:bg-purple-200"
    };
  } else if (isLoading) {
    status = {
      visibility: "block",
      color: "blue",
      animation: "animate-ping",
      text: "Rendering...",
      bgLight: "bg-blue-100",
      bgDark: "dark:bg-blue-900",
      textLight: "text-blue-800",
      textDark: "dark:text-blue-200",
      dotLight: "bg-blue-600",
      dotDark: "dark:bg-blue-300"
    };
  }

  return (
    <div className={`${status.visibility} text-center`}>
      <span className="sr-only">Status: {status.text}</span>
      <span className={`
        inline-flex items-center
        ${status.bgLight} ${status.bgDark}
        ${status.textLight} ${status.textDark} text-sm
        px-3 py-0.5
        rounded-full`}>
        <span className={`absolute inline-flex size-2 ${status.animation} rounded-full ${status.dotLight} ${status.dotDark}`}></span>
        <span className={`relative inline-flex size-2 me-2.25 ${status.dotLight} ${status.dotDark} rounded-full`}></span>
        {status.text}
      </span>
    </div>
  );
};

export default StatusIndicator;