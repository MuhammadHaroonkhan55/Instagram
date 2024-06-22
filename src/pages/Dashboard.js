import React from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="bg-gray-background min-h-screen">
      <Header />
      <div className="grid grid-cols-4 gap-4 mx-auto max-w-screen-lg">
        <div className="col-span-3"></div>
        <div className="col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
