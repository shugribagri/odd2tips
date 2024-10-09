import React from "react";
import ReactLoading from "react-loading";

const Loading: React.FC = () => {
  return (
    <main className="h-screen w-full bg-[whitesmoke] text-teal-500 flex items-center justify-center">
      <ReactLoading type="spin" color="#38a169" height={"20%"} width={"20%"} />
    </main>
  );
};

export default Loading;
