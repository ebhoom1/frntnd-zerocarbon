// import React from "react";
// import {
//   Table as MuiTable,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Box,
// } from "@mui/material";

// const Table = ({ rows, columns, loading, error }) => {
//   return (
//     <Box sx={{ width: "100%", overflow: "hidden" }}>
//       {loading && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       )}
//       {error && (
//         <Typography color="error" align="center">
//           {error}
//         </Typography>
//       )}
//       {!loading && !error && (
//         <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//           <MuiTable stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.field} style={{ fontWeight: "bold" }}>
//                     {column.headerName}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.length > 0 ? (
//                 rows.map((row) => (
//                   <TableRow sx={{cursor:"pointer"}} key={row.id}> 
//                     {columns.map((column) => (
//                       <TableCell key={column.field}>
//                         {row[column.field]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </MuiTable>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default Table;


import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Table = ({ rows, columns, loading, error }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/flowchart/${row.id}`);
    console.log("userId:",row.id); // Navigate to the flowchart page with userId
  };
console.log("rows:",rows)
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress/>
        </Box>
      )}
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <MuiTable stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} style={{ fontWeight: "bold" }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.field}>
                        {row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )}
    </Box>
  );
};

export default Table;
