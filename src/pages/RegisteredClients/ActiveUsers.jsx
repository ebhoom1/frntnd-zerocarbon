// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from '../../api/axios';

// const CompletedUsersTable = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchCompletedForms = async () => {
//       try {
//         const response = await axios.get('/api/admin/completed'); // Adjust the endpoint as per your backend
//         const formattedData = response.data.map((form, index) => ({
//           id: index + 1,
//           name: form.primaryContact.name,
//           email: form.primaryContact.email,
//           phone: form.primaryContact.phone,
//           companyName: form.companyName,
//         }));
//         setRows(formattedData);
//       } catch (error) {
//         console.error('Error fetching completed forms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompletedForms();
//   }, []);

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 200 },
//     { field: 'email', headerName: 'Email', width: 250 },
//     { field: 'phone', headerName: 'Phone', width: 200 },
//     { field: 'companyName', headerName: 'Company Name', width: 250 },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid 
//         rows={rows} 
//         columns={columns} 
//         pageSize={5} 
//         rowsPerPageOptions={[5]} 
//         loading={loading}         
//       />
//     </div>
//   );
// };

// export default CompletedUsersTable; 



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, MenuItem,Box } from '@mui/material';
import axios from '../../api/axios';

const CompletedUsersTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(rows);
  useEffect(() => {
    // Fetch data from the API
    const fetchCompletedForms = async () => {
      try {
        const response = await axios.get('/api/admin/completed'); 
        const formattedData = response.data.map((form, index) => ({
          id: index + 1,
          name: form.userName,
          email: form.email,
          phone: form.contactNumber,
          companyName: form.companyName,
          consultant: '', // Default value for the consultant column
        }));
        console.log("formateddata:",formattedData)
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching completed forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedForms();
  }, []);

  const handleConsultantChange = (id, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, consultant: value } : row
      )
    );
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'companyName', headerName: 'Company Name', width: 250 },
    {
      field: 'consultant',
      headerName: 'Consultant',
      width: 200,
      renderCell: (params) => (
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width:"100%",
          height:"100%", 
        }}
      >
        <TextField
          select
          fullWidth
          size="small"
          label="Consultant"
          value={params.row.consultant || ''}
          onChange={(e) => handleConsultantChange(params.row.id, e.target.value)}
          variant="outlined"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Consultant A">Consultant A</MenuItem>
          <MenuItem value="Consultant B">Consultant B</MenuItem>
        </TextField>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
      />
    </div>
  );
};

export default CompletedUsersTable;
