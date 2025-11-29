import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const NavigationDrawer = ({ open, onClose }) => {
  const pathMap = {
    Home: "/",
    Profile: "/profile",
    Currency: "/currency",
    Shop: "/shop",
    About: "/about",
    "Contact Us": "/contact",
    "Admin Login": "/admin-login",
  };

  const items = Object.keys(pathMap);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "black",
          color: "white",
          width: 260,
        },
      }}
    >
      <div className="p-4" onClick={onClose}>
        <List>
          {items.map((text) => (
            <ListItem key={text} disablePadding>
              {/* Wrap with Link */}
              <Link to={pathMap[text]} className="w-full">
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    className="border-b border-gray-600"
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
