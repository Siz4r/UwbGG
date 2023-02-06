import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {useEffect, useState} from "react";
import {alpha, styled} from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import InputBase from "@mui/material/InputBase";
import {Alert, Button, Grid, List, ListItem, Snackbar} from "@mui/material";
import {theme} from "../../views/UserInfo/UserInfoFormInput";
import {getUsersByNick} from "../../store/Users/api";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {IuserSlice} from "../../store/Users/slice";
import {UserSearchDTO} from "../../store/Users/types";
import {sendInvitation} from "../../store/Invitations/api";
import {parseErrorToString} from "../parseErrorToString";
import {ErrorPopUp} from "./ErrorPopUp";
import {useSelectUser} from "../hooks/SelectUser/SelectUser";
import {isBoolean} from "../../utils/isCheckers/isBoolean";
import {SuccessHandler} from "./SuccessHandler";

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
  const [focused, setFocused] = useState(false);
  const { searchUsers} = useSelector<RootState>(({user}) => user) as IuserSlice
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelectUser()
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) dispatch(getUsersByNick(value))
  }, [value]);

  const addFriendOnClick = async (user: UserSearchDTO) => {
    if (user && user.id) {
     try {
       const result = await dispatch(sendInvitation(user.id));
      if (sendInvitation.rejected.match(result)) {
        throw result.payload;
      }
      setOpen(true)
    } catch (e) {
      parseErrorToString(e, setFormError);
    }
    }
  };

  const setBlue = () => {
    setIgnoreBlur(true)
  }

  const clearIgnoreBlur = () => {
    setIgnoreBlur(false)
  }

  const handleBlur = () => {
    if (ignoreBlur) return;
    setFocused(false)
  }


  return (
      <div onMouseDown={setBlue}
           onMouseUp={clearIgnoreBlur}
           onMouseOut={clearIgnoreBlur}
           onBlur={handleBlur}>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
      />
      {searchUsers && searchUsers.length > 0 && focused && (
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
          {!isBoolean(user) && searchUsers
              .filter(userData => userData.id !== user.id)
              .map((user: UserSearchDTO) => (
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
      {formError && <ErrorPopUp errorMessage={formError} setFormError={setFormError} />}
      <SuccessHandler open={open} setOpen={setOpen} content={'Invitation send successfully!'}/>
    </Search>
      </div>
  );
};
