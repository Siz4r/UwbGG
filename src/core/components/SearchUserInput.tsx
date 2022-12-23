import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import { useEffect, useState } from "react";
import Users from "../../MOCK_DATA.json";
import { UserData } from "./types";
import { Button, Grid, List, ListItem } from "@mui/material";
import { theme } from "../../views/UserInfo/UserInfoFormInput";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addFriend } from "../../store/Friends/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

export const SearchUserInput = () => {
  const [value, setValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [focused, setFocused] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value !== "") {
      setFilteredUsers(
        Users.filter(
          (user) => !!user.nick?.toLowerCase().includes(value.toLowerCase())
        ).map(
          (user) =>
            ({
              ...user,
              id: user.id + "",
            } as UserData)
        )
      );
    } else {
      setFilteredUsers([]);
    }
  }, [value]);

  const addFriendOnClick = (user: UserData) => {
    if (user && user.id) {
      dispatch(addFriend(user));
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
      />
      {filteredUsers.length > 0 && focused && (
        <List
          sx={{
            overflow: "auto",
            scrollbarWidth: 0,
            width: "100%",
            maxWidth: 360,
            maxHeight: 360,
            position: "absolute",
            backgroundColor: "dark",
            "& ul": { padding: 0 },
            borderRadius: theme.shape.borderRadius,
          }}
          subheader={<li />}
        >
          {filteredUsers.map((user: UserData) => (
            <ListItem
              sx={{
                backgroundColor: alpha(theme.palette.common.black, 0.85),
              }}
              key={user.id}
            >
              <Grid
                container
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => addFriendOnClick(user)}
                    sx={{
                      maxWidth: "40px",
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid
                  item
                  sx={{
                    paddingLeft: 1,
                  }}
                >
                  {user.nick}
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </Search>
  );
};
