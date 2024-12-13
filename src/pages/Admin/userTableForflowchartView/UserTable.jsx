import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersWithUserTypeUser } from "../../../redux/features/user/userGetReducer"; // Adjust the path
import Table from "../../../components/Admin/Table/Table"; // Path to reusable Table component

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userFetch);

  useEffect(() => {
    dispatch(fetchUsersWithUserTypeUser());
  }, [dispatch]);

  // Define columns specific to users
  const columns = [
    { field: "userName", headerName: "Name", width: 150 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "contactNumber", headerName: "Phone", width: 150 },
  ];

  // Map user data to rows
  const rows = users.map((user, index) => ({
    id: user._id,
    userName: user.userName,
    companyName: user.companyName || "N/A",
    email: user.email,
    contactNumber: user.contactNumber,
  }));

  return (
    <div>
      <h1>User Table</h1>
      <Table rows={rows} columns={columns} loading={loading} error={error} />
    </div>
  );
};

export default UserTable;
