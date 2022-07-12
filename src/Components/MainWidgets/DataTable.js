import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable } from "react-table";

export default function DataTable() {
  const projects = useRef({});

  const fethProjects = async () => {
    fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (response) {
      if (response) {
        const projects = await response.json();
        console.log("Productos: ", projects);
        projects.current = data.target;
      }
    });
  };

  fethProjects();

  const data = useMemo(() => [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: 259,
      },
    },
  ]);

  const columns = useMemo(() => [
    {
      Header: "Id", // nombre de la columna en la tabla
      accessor: "id", // nombre de la propiedad dentro del objecto que se obtiene de la base de datos
    },
    {
      Header: "Price", // nombre de la columna en la tabla
      accessor: "price", // nombre de la propiedad dentro del objecto que se obtiene de la base de datos
    },
    {
      Header: "Title", // nombre de la columna en la tabla
      accessor: "title", // nombre de la propiedad dentro del objecto que se obtiene de la base de datos
    },
  ]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRows } = tableInstance

  return <div>DataTable</div>;
}
