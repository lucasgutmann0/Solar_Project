import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns, loading, onSelectionModelChange }) => {
  const [pageSize, setPageSize] = useState(6);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  return (
    <div className="h-full p-5 bg-white border-gray-200 border drop-shadow-lg rounded-xl">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowsPerPageOptions={[6, 10, 20, 40]}
        pagination
        pageSize={pageSize}
        checkboxSelection={true}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // onSelectionModelChange={itm => console.log(itm)}
        onSelectionModelChange={onSelectionModelChange}
      />
    </div>
  );
};

export default DataTable;
