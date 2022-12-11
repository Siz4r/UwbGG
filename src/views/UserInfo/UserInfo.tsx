import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme, UserInfoFormInput } from "./UserInfoFormInput";
import { InvitationTab } from "../../core/components/InvitationTab";
import { useSelectUser } from "../../core/hooks/SelectUser/SelectUser";
import { isBoolean } from "../../utils/isCheckers/isBoolean";
import { useInvitations } from "../../core/hooks/Invitations/useInvitations";
import React, { useRef, useState } from "react";

export const UserInfo = () => {
  const { user } = useSelectUser();

  const [text, setText] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef({});

  function handleAccept(text: string) {
    clearTimeout(typeof ref.current === "number" ? ref.current : 0);
    setOpen(true);
    setText(text);
    ref.current = setTimeout(() => setOpen(false), 2000); // Close the modal after 2 seconds
  }

  const { invitations, isLoading } = useInvitations({ fetchOnMount: true });

  return !isBoolean(user) ? (
    <AuthenticatedView>
      <Box flex={1} height={"100%"} flexGrow={1}>
        <ThemeProvider theme={theme}>
          <Grid container sx={{ height: "100%" }} overflow={"hidden"}>
            <Grid item height={"100%"} xs={9}>
              <UserInfoFormInput user={user} />
            </Grid>
            <Grid
              item
              xs={3}
              height={"100%"}
              sx={{
                "--Grid-borderWidth": "1px",
                borderTop: "var(--Grid-borderWidth) solid",
                borderLeft: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
                "& > div": {
                  borderRight: "var(--Grid-borderWidth) solid",
                  borderBottom: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                },
                overflow: "auto",
              }}
            >
              {invitations.length > 0 &&
                !isLoading &&
                invitations.map((invitation) => (
                  <InvitationTab
                    inv={invitation}
                    key={invitation.id}
                    handleAccept={handleAccept}
                  />
                ))}
            </Grid>
            <Snackbar
              open={open}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{
                backgroundColor: "lightgray",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#2e7d32",
                }}
              >
                {text}
              </Typography>
            </Snackbar>
          </Grid>
        </ThemeProvider>
      </Box>
    </AuthenticatedView>
  ) : (
    <></>
  );
};
