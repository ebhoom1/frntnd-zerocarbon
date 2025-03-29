import { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography } from "@mui/material";

const RenderQuestionAnswers = ({ category, sectionKey, responseKeyPrefix, environmentQuestions, submissionData }) => {
  const questions = environmentQuestions[category]?.[sectionKey];
  const responses = submissionData?.[`${category.replace(/\s/g, "")}_${sectionKey.replace(/\s/g, "")}`];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!questions || !responses || responses.length === 0) return <Typography>No Data Available</Typography>;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mb: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {questions.map((q, idx) => (
                q.type === "array"
                  ? q.fields.map((field, fIdx) => (
                      <TableCell key={`${idx}-${fIdx}`}><strong>{field.question}</strong></TableCell>
                    ))
                  : <TableCell key={idx}><strong>{q.question}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, rowIndex) => (
              <TableRow key={rowIndex} sx={{ backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                {questions.map((q, idx) => {
                  const responseKey = `${responseKeyPrefix}_Q${idx + 1}`;
                  if (q.type === "array") {
                    if (Array.isArray(entry[responseKey]) && entry[responseKey].length > 0) {
                      return q.fields.map((field, i) => {
                        let values = entry[responseKey].map((item, arrIdx) => {
                          const methodKey = `${responseKeyPrefix}_Q${idx + 1}_method_${arrIdx}_F${i + 1}`;
                          return item[methodKey] ?? "Not Available";
                        });
                        return <TableCell key={`${idx}-${i}`}>{values.join(", ")}</TableCell>;
                      });
                    } else {
                      return q.fields.map((field, i) => (
                        <TableCell key={`${idx}-${i}`}>Not Available</TableCell>
                      ));
                    }
                  } else {
                    const answer = entry[responseKey];
                    return (
                      <TableCell key={idx}>{Array.isArray(answer) ? JSON.stringify(answer) : (answer ?? "Not Available")}</TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={responses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
};

export default RenderQuestionAnswers;

// import { useState } from "react";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography } from "@mui/material";

// const RenderQuestionAnswers = ({ category, sectionKey, responseKeyPrefix, environmentQuestions, submissionData }) => {
//   const questions = environmentQuestions[category]?.[sectionKey];
//   const responses = submissionData?.[`${category.replace(/\s/g, "")}_${sectionKey.replace(/\s/g, "")}`];
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   if (!questions || !responses || responses.length === 0) return <Typography>No Data Available</Typography>;

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Special handling for array type with fields (display as table per row)
//   const isArraySection = questions.some((q) => q.type === "array");

//   return (
//     <Box sx={{ mb: 2, border: "1px solid #ccc", borderRadius: 2 }}>
//       <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               {questions.map((q, idx) => (
//                 q.type === "array"
//                   ? q.fields.map((field, fIdx) => (
//                       <TableCell key={`${idx}-${fIdx}`}><strong>{field.question}</strong></TableCell>
//                     ))
//                   : <TableCell key={idx}><strong>{q.question}</strong></TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {responses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, rowIndex) => (
//               <TableRow key={rowIndex} sx={{ backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#fff" }}>
//                 {questions.map((q, idx) => {
//                   const responseKey = `${responseKeyPrefix}_Q${idx + 1}`;
//                   if (q.type === "array") {
//                     if (Array.isArray(entry[responseKey])) {
//                       // Collect formatted field-wise values
//                       return q.fields.map((field, i) => {
//                         const values = entry[responseKey].map((_, arrIdx) => {
//                           const methodKey = `${responseKeyPrefix}_Q${idx + 1}_method_${arrIdx}_F${i + 1}`;
//                           return entry[methodKey] ?? "Not Available";
//                         });
//                         return <TableCell key={`${idx}-${i}`}>{values.join(", ")}</TableCell>;
//                       });
//                     } else {
//                       return q.fields.map((_, i) => (
//                         <TableCell key={`${idx}-${i}`}>Not Available</TableCell>
//                       ));
//                     }
//                   } else {
//                     const answer = entry[responseKey];
//                     return (
//                       <TableCell key={idx}>{Array.isArray(answer) ? JSON.stringify(answer) : (answer ?? "Not Available")}</TableCell>
//                     );
//                   }
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default RenderQuestionAnswers; 


