import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { SearchUserInput } from "./components/SearchUserInput";
import ChatIcon from "@mui/icons-material/Chat";
import ConversationCreateModal from "./components/ConversationCreateModal";
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAppDispatch } from "./hooks/reduxHooks";
import { logout } from "../store/Users/api";
import { useNavigate } from "react-router";
import { RouterPathsKeys } from "../types/RouterPaths";
import { parseErrorToString } from "./parseErrorToString";
import { useSelectUser } from "./hooks/SelectUser/SelectUser";
import { isBoolean } from "../utils/isCheckers/isBoolean";

export default function Nav() {
  const dispatch = useAppDispatch();
  const { user } = useSelectUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    try {
      const result = await dispatch(logout());

      if (logout.rejected.match(result)) {
        throw result.payload;
      }

      navigate(RouterPathsKeys.LOGIN);
    } catch (e) {
      parseErrorToString(e, setFormError);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} maxHeight={"100%"}>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <SettingsIcon sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: "14%",
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => navigate(RouterPathsKeys.USERINFO)}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={() => navigate(RouterPathsKeys.FRIENDS)}>
              <Avatar /> My Friends
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate(RouterPathsKeys.CHATS)}>
              <ListItemIcon>
                <ChatIcon fontSize="small" />
              </ListItemIcon>
              Chat
            </MenuItem>
            <MenuItem onClick={() => logoutUser()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          {!isBoolean(user) && (
            <ConversationCreateModal
              name={"Konfa"}
              friends={user.friends ? user.friends : []}
            />
          )}
          <SearchUserInput />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
