import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const DataTableProjects = () => {
  //1 - Configurar los hooks
  const [users, setUsers] = useState([]);

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  //2 - Función para mostrar los datos con fetch
  const URL = "https://fakestoreapi.com/products";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    showData();
  }, []);

  //3 - Configuramos las columns para Datatable
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "4rem",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "5rem",
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  //personalizar temas
  createTheme("custom", {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#fff",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#fff",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#fff",
        },
      },
    },
  };

  //4 - Mostramos la data en DataTable
  return (
    <DataTable
      title="Proyectos"
      columns={columns}
      data={users}
      customStyles={customStyles}
      // expandableRows
      // expandableRowsComponent={ExpandedComponent}
      pagination
      selectableRows
    />
  );
};

export default DataTableProjects;
