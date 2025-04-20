// import React, { useState, useEffect } from "react";
// import './userlist.css';
// import { DataGrid } from "@mui/x-data-grid";
// import { Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersWithUserTypeUser } from "../../../redux/features/user/userGetReducer";

// const UserTableList = ({ onUserSelect, title = "User List" }) => {
//   const dispatch = useDispatch();
//   const { users, loading } = useSelector((state) => state.userFetch);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     dispatch(fetchUsersWithUserTypeUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (users && users.length > 0) {
//       const formattedData = users.map((user, index) => ({
//         id: index + 1,
//         mongoId: user._id,
//         name: user.userName,
//         companyName: user.companyName,
//       }));
//       setRows(formattedData);
//     }
//   }, [users]);

//   const handleRowClick = (params) => {
//     if (onUserSelect) onUserSelect(params.row.mongoId, params.row.companyName);
//   };

//   const columns = [
//     { field: "name", headerName: "Name", width: 200 },
//     { field: "companyName", headerName: "Company", width: 250 },
   
//   ];

//   return (
//     <Box sx={{}}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#2e7d32" }}>
//         {title}
//       </Typography>
//       <div style={{ height: 200, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//            hideFooter            
//           loading={loading}
//           onRowClick={handleRowClick}
//         />
//       </div>
//     </Box>
//   );
// };

// export default UserTableList;


import React, { useState, useEffect } from "react";
import './userlist.css';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersWithUserTypeUser } from "../../../redux/features/user/userGetReducer";

const UserTableList = ({ onUserSelect, title = "User List" }) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userFetch);
  const loggedInUser = useSelector((state) => state.auth.user);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchUsersWithUserTypeUser());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const filteredUsers =
        loggedInUser?.userType === "consultantadmin"
          ? users.filter(
              (user) => user.consultantAdminId === loggedInUser.id
            )
          : users;

      const formattedData = filteredUsers.map((user, index) => ({
        id: index + 1,
        mongoId: user._id,
        name: user.userName,
        companyName: user.companyName,
      }));
      setRows(formattedData);
    }
  }, [users, loggedInUser]);

  const handleRowClick = (params) => {
    if (onUserSelect) onUserSelect(params.row.mongoId, params.row.companyName);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "companyName", headerName: "Company", width: 250 },
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", color: "#2e7d32" }}
      >
        {title}
      </Typography>
      <div style={{ height: 200, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          loading={loading}
          onRowClick={handleRowClick}
        />
      </div>
    </Box>
  );
};

export default UserTableList;
