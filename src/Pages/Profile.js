import React from "react";
import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import DataTableProjects from "../Components/MainWidgets/DataTableProjects";

export default function Profile() {
  return (
    <div className="flex flex-row h-screen">
      <div className="pr-28">
        <SideBar />
      </div>
      <div className=" p-10 bg-gradient-to-r from-gray-100 to-gray-300 ml-1 my-4 mr-4 rounded-lg w-full">
        <div className="items-center justify-center text-center">
          <h3 className="font-bold text-3xl">
            Bienvenido{" "}
            <span className="text-amber-700">
              {localStorage.getItem("username")}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
