import React, { useState } from "react";
import UserTableList from "../../../components/Admin/userList/UserList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRoadmaps } from "../../../redux/features/roadmap/UserRoadmapSlice";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Timeline } from "@mui/lab";
import RoadmapTimelineItem from "../RoadmapTimeline";
import EmissionsSimulationDisplay from "./EmissionsSimulationDisplay";
import RenewableEnergyDisplay from "./RenewableEnergyDisplay";

const DecarbonisationPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
  const { roadmaps, loading } = useSelector((state) => state.userRoadmap);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    dispatch(fetchUserRoadmaps(userId));
  };

  const renderUserInfo = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3F4F44",mt:2 }}>
        Saved Roadmaps
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : roadmaps.length > 0 ? (
        roadmaps.map((roadmap, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h7" sx={{ fontWeight: "bold", color: "#697565" }}>
              {roadmap.industry} - Target Year: {roadmap.targetYear}
            </Typography>

            <Timeline position="alternate">
              {roadmap.milestones.map((milestone, i) => (
                <RoadmapTimelineItem
                  key={i}
                  milestone={milestone}
                  index={i}
                  roadmapData={roadmap.milestones}
                />
              ))}
            </Timeline>
          </Box>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>
          No roadmaps available for this user.
        </Typography>
      )}

      <EmissionsSimulationDisplay userId={selectedUserId} />
      <RenewableEnergyDisplay userId={selectedUserId} />
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <UserTableList title="Select User" onUserSelect={handleUserSelect} />
      {selectedUserId && renderUserInfo()}
    </Box>
  );
};

export default DecarbonisationPage;



// DecarbonisationPage.jsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import { Timeline } from "@mui/lab";
// import UserTableList from "../../../components/Admin/userList/UserList";
// import RoadmapTimelineItem from "../RoadmapTimeline";
// import { fetchUserRoadmaps } from "../../../redux/features/roadmap/UserRoadmapSlice";
// import { fetchUserSimulations } from "../../../redux/features/simulation/simulationSlice";
// import EmissionsSimulationDisplay from "../../../components/Admin/EmissionsSimulationDisplay";

// const DecarbonisationPage = () => {
//   const dispatch = useDispatch();
//   const { roadmaps, loading } = useSelector((state) => state.userRoadmap);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   const handleUserSelect = (userId) => {
//     setSelectedUserId(userId);
//     dispatch(fetchUserRoadmaps(userId));
//     dispatch(fetchUserSimulations(userId));
//   };

//   const renderUserInfo = () => (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00c853" }}>
//         Saved Roadmaps
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : roadmaps.length > 0 ? (
//         roadmaps.map((roadmap, index) => (
//           <Box key={index} sx={{ mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00c853" }}>
//               {roadmap.industry} - Target Year: {roadmap.targetYear}
//             </Typography>
//             <Timeline position="alternate">
//               {roadmap.milestones.map((milestone, i) => (
//                 <RoadmapTimelineItem
//                   key={i}
//                   milestone={milestone}
//                   index={i}
//                   roadmapData={roadmap.milestones}
//                 />
//               ))}
//             </Timeline>
//           </Box>
//         ))
//       ) : (
//         <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>
//           No roadmaps available for this user.
//         </Typography>
//       )}

//       {/* Simulation Results */}
//       <EmissionsSimulationDisplay userId={selectedUserId} />
//     </Box>
//   );

//   return (
//     <>
//       <UserTableList title="Select User" onUserSelect={handleUserSelect} />
//       {renderUserInfo()}
//     </>
//   );
// };

// export default DecarbonisationPage;
