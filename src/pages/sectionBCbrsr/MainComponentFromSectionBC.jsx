


// MainComponentFromSectionBC.jsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';

import SpecificCommitmentsForm from './Q5Q6_SpecificCommitmentsForm';
import Q7_DirectorStatement from './Q7_DirectorStatement';
import Q8_HighestAuthority from './Q8_HighestAuthority';
import Q9_SustainabilityCommittee from './Q9_SustainabilityCommittee';
import Principle1_Disclosure from './sectionc/Principle1_Disclosure';
import Principle2_Disclosure from './sectionc/Principle2_Disclosure';
import Principle3_Disclosure from './sectionc/Principle3_Disclosure';
import Principle4_Disclosure from './sectionc/Principle4_Disclosure';
import Principle5_Disclosure from './sectionc/Principle5_Disclosure';
import Principle6_Disclosure from './sectionc/Principle6_Disclosure';
import Principle7_Disclosure from './sectionc/Principle7_Disclosure';
import Principle8_Disclosure from './sectionc/Principle8_Disclosure';
import Principle9_Disclosure from './sectionc/Principle9_Disclosure';


const MainComponentFromSectionBC = () => {
  const userId = useSelector((state) => state.auth.user.id);

  const handleSave = async (data) => {
    try {
      const res = await axios.post('api/sectionb', { userId, data });
      console.log(res.data);
      alert('Saved successfully');
    } catch (error) {
      console.error('Error saving Section B or C:', error);
    }
  };

  return (
    <Box sx={{ p: 2,display:"flex",flexDirection:"column",gap:"10px" }}>
      <Typography variant="h5" gutterBottom>
        Section B & C: BRSR Disclosure
      </Typography>

      {/* SECTION B */}
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Specific Commitments, Goals and Performance (Q5 & Q6)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SpecificCommitmentsForm onSave={handleSave} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Director's ESG Statement (Q7)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Q7_DirectorStatement onSave={handleSave} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Highest Authority Responsible for BR Policy (Q8)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Q8_HighestAuthority onSave={handleSave} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sustainability Committee (Q9)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Q9_SustainabilityCommittee onSave={handleSave} />
        </AccordionDetails>
      </Accordion>

      {/* SECTION C - PRINCIPLE 1 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 1: Ethics, Transparency and Accountability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle1_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
      {/* SECTION C - PRINCIPLE 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 2: Product Lifecycle Sustainability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle2_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 3 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 3: Employee Wellbeing, Diversity & Equality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle3_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 4 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 4: Stakeholder Engagement and Inclusive Growth</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle4_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 5 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 5: Human Rights</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle5_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 6 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 6: Environmental Impact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle6_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 7 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 7: Responsible Policy Advocacy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle7_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 8 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 8: Inclusive Growth and Equitable Development</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle8_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
        {/* SECTION C - PRINCIPLE 9 */}
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Principle 9: Consumer Value and Protection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Principle9_Disclosure onSave={handleSave} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MainComponentFromSectionBC;
