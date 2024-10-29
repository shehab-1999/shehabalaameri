// "use client";

// import React, { useState } from "react";
// import {
//   DataGrid,
//   GridColDef,
//   GridRenderCellParams,
//   GridToolbar,
// } from "@mui/x-data-grid";
// import {
//   QueryClient,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import update from "../Update/page";
// import { error } from "console";
// import Link from "next/dist/client/link";
// import { use } from "react";
// import axios from "axios";
// import Add from "../Add/page";
// import Update from "../Update/page";
// import { deleteDoctor } from "@/queries/doctors/useDeleteDoctro";
// type Props = {
//   Column: GridColDef[];
//   Row: any;
//   slug: string;
// };
// export default function DataTable(props: Props) {
//   const [id, setId] = useState();
//   const [open, setOpen] = useState(false);
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: (id: any) => deleteDoctor(`${id}`),

//     onError: (error) => {
//       // Rollback the optimistic update
//       queryClient.invalidateQueries({ queryKey: [`all${props.slug}`] });
//     },
//     onSuccess: () => {
//       // Invalidate the cache to refetch the updated data
//       queryClient.invalidateQueries({ queryKey: [`all${props.slug}`] });
//     },
//   });

//   const handleDelete = async (id: String) => {
//     mutation.mutateAsync(id);
//   };

//   const actionColumn: GridColDef = {
//     field: "",
//     headerName: "Action",
//     width: 120,
//     headerAlign: "right",
//     headerClassName: "text-[20px]  ",
//     cellClassName: "text-[10px] mr-[30px] ",
    
   
//     renderCell: (parms: GridRenderCellParams) => {
//       return (
//         <div className="flex gap-[10px] mt-[15px] ">
//           <button
//             onClick={() => {
//               setId(parms.row.id);
//               setOpen(true);
//             }}
//           >
//             <img
//               src="/view.svg"
//               alt=""
//               className="h-[20px] w-[20px] cursor-pointer"
//             />
//           </button>

//           <img
//             src="/delete.svg"
//             alt=""
//             className="h-[20px] w-[20px] cursor-pointer"
//             onClick={() => {
//               axios.delete(
//                 `http://localhost:8081/deleteDoctor/${parms.row.id}`
//               );
//             }}
//           />
//         </div>
//       );
//     },
//   };
//   return (
//     <div className="w-[100%]">
//       <DataGrid
//         className="bg-white "
//         rows={props.Row}
        
//         columns={[...props.Column, actionColumn]}
//         initialState={{
//           pagination: {
//             paginationModel: { pageSize: 7 },
//           },
//           columns: {
//             columnVisibilityModel: {
//               id: false,
//             },
//           },
//         }}
//         slots={{ toolbar: GridToolbar }}
//         slotProps={{
//           toolbar: {
//             showQuickFilter: true,
//             quickFilterProps: { debounceMs: 500 },
//           },
//         }}
//         pageSizeOptions={[7]}
//         checkboxSelection
//         disableRowSelectionOnClick
//         disableColumnFilter
//         disableDensitySelector
//         disableColumnSelector
//       />
//       {open && (
//         <Update
//           column={props.Column}
//           id={id}
//           setOpen={setOpen}
//           slug={"doctro"}
//         ></Update>
//       )}
//     </div>
//   );
// }
