import React from "react";
import { 
  Card, CardContent, Typography, List, ListItem, 
  ListItemAvatar, Avatar, ListItemText, Box 
} from "@mui/material";
import { EmojiEvents, Star, MilitaryTech } from "@mui/icons-material";

const Leaderboard = () => {
  // Placeholder leaderboard data
  const topEmployees = [
    { id: 1, name: "Alice Johnson", profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60", carbonCredits: 500 },
    { id: 2, name: "Bob Smith", profilePic: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60", carbonCredits: 450 },
    { id: 3, name: "Charlie Brown", profilePic: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&auto=format&fit=crop&q=60", carbonCredits: 400 },
    { id: 4, name: "Charlie Brown", profilePic: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&auto=format&fit=crop&q=60", carbonCredits: 300 },
    { id: 5, name: "Charlie Brown", profilePic: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&auto=format&fit=crop&q=60", carbonCredits: 200 },
  ];

  // Rank icons based on position
  const rankIcons = [
    <EmojiEvents sx={{ color: "gold", fontSize: 24 }} />, // 🏆 Gold for 1st place
    <MilitaryTech sx={{ color: "silver", fontSize: 24 }} />, // 🥈 Silver for 2nd place
    <Star sx={{ color: "chocolate", fontSize: 24 }} />, // 🥉 Bronze for 3rd place
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: "hidden", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <Box sx={{ background: "linear-gradient(135deg, #5CB338 0%, #66CC66 100%)", color: "white", textAlign: "center", p: 2 }}>
        <Typography variant="h5" fontWeight="bold">🏆 Leaderboard</Typography>
      </Box>

      <CardContent>
        <List>
          {topEmployees.map((employee, index) => (
            <ListItem
              key={employee.id}
              sx={{
                bgcolor: index === 0 ? "rgba(255, 215, 0, 0.2)" : "transparent", // Highlight 1st place
                borderRadius: 2,
                transition: "0.3s",
                '&:hover': { bgcolor: "rgba(0, 0, 0, 0.05)" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={employee.profilePic}
                  alt={employee.name}
                  sx={{ width: 50, height: 50, border: index === 0 ? "3px solid gold" : "none" }}
                />
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    {rankIcons[index]} 
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: "bold", color: "#2C3E50" }}>
                      {employee.name}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: "#7F8C8D" }}>
                    Carbon Credits: <strong>{employee.carbonCredits}</strong>
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
