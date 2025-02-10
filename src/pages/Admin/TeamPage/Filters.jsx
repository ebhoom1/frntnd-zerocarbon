import React from "react";
import "./Filter.css";
import { Card, Typography, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FilterCard = styled(Card)(({ theme }) => ({
  padding: "15px 30px",
  borderRadius: "18px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  width: "100%", // Ensure it takes full width
  overflow: "hidden",
}));

const RoundedTextField = styled(TextField)(({ theme }) => ({
  width: "180px", // Adjust width for small screens
  marginTop: "5px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ccc",
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px", // Smaller input width on small screens
  },
}));

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024, // Tablet
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768, // Small tablets
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600, // Large phones
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 400, // Small phones
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Filters = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <FilterCard>
      <Slider {...settings}>
        {/* Dropdown Filters */}
        {[
          { label: "Department", name: "department", options: ["Engineering", "Operations", "HR"] },
          { label: "Job Title", name: "jobTitle", options: ["Software Engineer", "Project Manager", "HR Manager"] },
          { label: "Location", name: "location", options: ["New York", "San Francisco", "Los Angeles"] },
        ].map(({ label, name, options }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <RoundedTextField
              select
              label={label}
              name={name}
              value={filters[name]}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </RoundedTextField>
          </div>
        ))}

        {/* Number Input Filters */}
        {[
          { label: "Min Carbon Credits", name: "carbonCredits" },
          { label: "Eco-Challenges Completed", name: "ecoChallenges" },
          { label: "Satisfaction Score", name: "satisfactionScore" },
          { label: "Training Hours Completed", name: "trainingHours" },
          { label: "Community Engagement", name: "communityEngagement" },
        ].map(({ label, name }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <RoundedTextField
              type="number"
              label={label}
              name={name}
              value={filters[name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </Slider>
    </FilterCard>
  );
};

export default Filters;
