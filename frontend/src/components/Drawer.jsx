import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Currency", path: "/currency" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Admin Login", path: "/admin-login" },
];

const NavigationDrawer = ({ open, onClose }) => {
  // lg = desktop, md/sm = mobile/tablet
  const isLarge = useMediaQuery("(min-width: 1024px)");

  // anchor changes based on device width
  const anchor = isLarge ? "left" : "top";

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { backgroundColor: "black", width: "260px" },
      }}
    >
      <div className="p-4 text-white">
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={onClose}>
                <ListItemText
                  primary={item.name}
                  className="text-white  border-b border-white/50 hover:bg-white/20 "
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
