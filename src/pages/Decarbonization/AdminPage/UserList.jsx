import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersWithUserTypeUser } from "../../../redux/features/user/userGetReducer";
import { fetchUserRoadmaps } from "../../../redux/features/roadmap/UserRoadmapSlice";
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import {
    Timeline,
  } from "@mui/lab";
import RoadmapTimelineItem from "../RoadmapTimeline";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector((state) => state.userFetch);
  const { roadmaps, loading: roadmapsLoading } = useSelector((state) => state.userRoadmap);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersWithUserTypeUser());
  }, [dispatch]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    dispatch(fetchUserRoadmaps(userId));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Users
      </Typography>

      {usersLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user._id} button onClick={() => handleUserClick(user._id)}>
              <ListItemText primary={user.userName} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}

      {selectedUserId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00c853" }}>
            Saved Roadmaps for Selected User
          </Typography>

          {roadmapsLoading ? (
            <CircularProgress />
          ) : roadmaps.length > 0 ? (
            roadmaps.map((roadmap, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00c853" }}>
                  {roadmap.industry} - Target Year: {roadmap.targetYear}
                </Typography>

                <Timeline position="alternate">
                  {roadmap.milestones.map((milestone, i) => (
                    <RoadmapTimelineItem key={i} milestone={milestone} index={i} roadmapData={roadmap.milestones} />
                  ))}
                </Timeline>
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "#666", fontStyle: "italic", mt: 2 }}>
              No roadmaps available for this user.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserList;
