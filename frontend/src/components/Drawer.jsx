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
  { name: "Currency", path: "/" },
  { name: "Shop", path: "/all-products" },
  { name: "About", path: "/" },
  { name: "Contact Us", path: "/" },
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
            <ListItem
              key={item.name}
              disablePadding
              className="hover:bg-white/20 hover:rounded"
            >
              <ListItemButton component={Link} to={item.path} onClick={onClose}>
                <ListItemText
                  primary={item.name}
                  className="text-white border-b border-white/50 hover:translate-x-3 transition duration-300 ease-in-out cursor-pointer"
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
