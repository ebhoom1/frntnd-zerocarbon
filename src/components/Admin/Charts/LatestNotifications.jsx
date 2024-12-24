import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const LatestNotifications = ({ notifications }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        height: "100%",
        width:280,
        // overflowY: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h7" fontWeight="bold" gutterBottom>
        Latest Notifications
      </Typography>
      <List>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={notification.title}
                secondary={notification.timestamp}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No new notifications.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default LatestNotifications;
