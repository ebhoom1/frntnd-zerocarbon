import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Section = ({ sectionName, subcategory, questions, handleInputChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Subcategory Accordion inside Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{subcategory}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "16px" }}>
              <Typography variant="subtitle1">{q.question}</Typography>

              {/* Number Input */}
              {q.type === "number" && (
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              )}

              {/* Text Input */}
              {q.type === "text" && (
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              )}

              {/* Yes/No Radio Buttons */}
              {q.type === "boolean" && (
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              )}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Section;
