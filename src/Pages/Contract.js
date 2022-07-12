import React from 'react'
import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import DataTableProjects from "../Components/MainWidgets/DataTableProjects";

export default function Contracts() {
  return (
    <div className="flex flex-row h-screen">
      <div className="pr-28">
        <SideBar />
      </div>
      <div className="pl-4 ml-1 my-4 mr-4 rounded-lg bg-gradient-to-tl w-full">

    <div>
        <h3 className='font-semibold text-2xl'>Gestión de Contratos</h3>
    </div>

        <div className="flex flex-row">
          <div className="flex flex-col w-8/12">
            <DataTableProjects />
          </div>
          <Map />
        </div>
      </div>
    </div>
  )
}
