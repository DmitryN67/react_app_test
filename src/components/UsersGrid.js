import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import UserForm from "./UserForm";
import { useQuery } from "react-query";

const getCars = async (key, page, pageSize) => {
  console.log("Axios", key, page, pageSize);
  const params = { offset: page * pageSize, limit: pageSize };
  const url = `http://localhost:8000/api/`;
  const response = await axios.get(`${url}${key}/`, { params });
  console.log("Axios", response.data);
  return response.data;
};

export default function UsersGrid() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // const { data, error, mutate } = useSWR(`${url}/?page=${page+1}`, getUsers);
  // console.log(data?.results);
  // console.log(data)
  // brand', 'car_model', 'slug', 'release_date', 'state_num', 'vin_num', 'owner', 'car_order'
  const { data, isLoading } = useQuery(["cars", page, pageSize], () =>
    getCars("cars", page, pageSize)
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "brand",
      headerName: "brand",
      width: 150,
      editable: true,
    },
    {
      field: "car_model",
      headerName: "car_model",
      width: 150,
      editable: true,
    },
    {
      field: "state_num",
      headerName: "state_num",
      type: "email",
      width: 300,
      editable: true,
    },
    {
      field: "vin_num",
      headerName: "vin_num",
      type: "email",
      width: 300,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <UserForm data={params.row} />
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data?.results ?? []}
        loading={isLoading}
        page={page}
        rowsPerPageOptions={[10]}
        rowCount={data?.count ?? 0}
        onPageChange={(newPage) => setPage(newPage.page)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize.pageSize)}
      />
    </div>
  );
}
