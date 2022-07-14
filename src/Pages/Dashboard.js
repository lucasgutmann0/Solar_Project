import React from "react";

import NavBar from "../Components/MainWidgets/NavBar";
import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import DataTableProjects from "../Components/MainWidgets/DataTableProjects";
import SideBarAnimated from "../Components/MainWidgets/SideBarAnimated";

export default function Dashboard() {
  return (
    <div className="flex flex-row h-screen">
      <div className="">
        <SideBarAnimated />
      </div>
      <div className="pl-4 ml-1 my-4 mr-4 rounded-lg bg-gradient-to-tl w-full">
        <div>
          <h3 className="font-semibold text-2xl">Dashboard</h3>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-8/12">
            <DataTableProjects />
          </div>
          <Map />
        </div>
      </div>
    </div>
  );
}
