import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { IoAdd } from "react-icons/io5";

const handleDelete = (clickedUser) => {
  // setCustomers(customers.filter((user) => user.id !== clickedUser.id));
  console.log(clickedUser.id);
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nombre del Cliente", width: 200 },
  { field: "contract", headerName: "Id Contract", width: 200 },
  {
    field: "actions",
    renderCell: (id) => {
      return (
        <motion.button
          className="px-3 py-2 flex flex-row justify-center items-center text-center font-bold bg-red-500 text-white rounded-xl"
          whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(id)}
        >
          Borrar
        </motion.button>
      );
    },
    headerName: "actions",
    width: 130,
  },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
