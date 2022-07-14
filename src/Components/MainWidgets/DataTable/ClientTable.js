import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DataTable from "./DataTable";

export default function ClientTable() {
  const [client, setClient] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const Header = ({ text }) => {
    return <h3 className="font-bold text-black">{text}</h3>;
  };

  const Button = ({ text, onclick, hover_Bg_color, bg_color }) => {
    return (
      <motion.button
        whileHover={{ backgroundColor: hover_Bg_color }}
        whileTap={{ scale: 0.9 }}
        className="px-3 h-10 flex flex-row justify-center items-center text-center font-bold  text-white rounded-xl"
        style={{ backgroundColor: bg_color }}
        onClick={onclick}
        // onClick = {()=> console.log(selectedRows)}
      >
        {text}
      </motion.button>
    );
  };

  const columns = [
    {
      field: "id",
      width: 100,
      renderHeader: () => <Header text="ID Cliente" />,
    },
    {
      field: "name",
      width: 250,
      renderHeader: () => <Header text="Nombre Cliente" />,
    },
    {
      field: "contract",
      width: 200,
      renderHeader: () => <Header text="Numero de Contrato" />,
    },
    {
      field: "creation_date",
      width: 230,
      renderHeader: () => <Header text="Fecha de Creación" />,
    },
    {
      field: "delete",
      width: 155,
      renderHeader: () => (
        <div className="h-10">
          <Button
            text="Borrar Selección"
            onclick={() => console.log(selectedRows)}
            hover_Bg_color="#AB1F1F"
            bg_color="#c42424"
          />
        </div>
      ),
      renderCell: () => <h3></h3>,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "deactivate",
      width: 185,
      renderHeader: () => (
        <div className="h-10">
          <Button
            text="Desactivar Selección"
            onclick={() => console.log(selectedRows)}
            hover_Bg_color="#d97706"
            bg_color="#f59e0b"
          />
        </div>
      ),
      renderCell: () => <h3></h3>,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  const URL = "http://0.0.0.0:8000/client/list/";
  const getData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setClient(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataTable
      rows={client}
      columns={columns}
      loading={!client.length}
      onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const selectedRows = client.filter((row) => selectedIDs.has(row.id));

        setSelectedRows(selectedRows);
      }}
    />
  );
}
