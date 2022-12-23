import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Box, Grid, Snackbar, ThemeProvider, Typography } from "@mui/material";
import { theme, UserInfoFormInput } from "./UserInfoFormInput";
import { InvitationTab } from "../../core/components/InvitationTab";
import { useSelectUser } from "../../core/hooks/SelectUser/SelectUser";
import { isBoolean } from "../../utils/isCheckers/isBoolean";
import { useInvitations } from "../../core/hooks/Invitations/useInvitations";
import React, { useRef, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { UserFriends } from "./UserFriends";

export const UserInfo = () => {
  const { user } = useSelectUser();

  const [text, setText] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef({});

  if (!isBoolean(user)) {
    console.log(user.friends);
  }

  function handleAccept(text: string) {
    clearTimeout(typeof ref.current === "number" ? ref.current : 0);
    setOpen(true);
    setText(text);
    ref.current = setTimeout(() => setOpen(false), 2000); // Close the modal after 2 seconds
  }

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "nick",
      headerName: "Nick",
      type: "text",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const { invitations, isLoading } = useInvitations({ fetchOnMount: true });

  return !isBoolean(user) ? (
    <AuthenticatedView>
      <Box flex={1} height={"100%"} flexGrow={1}>
        <ThemeProvider theme={theme}>
          <Grid container sx={{ height: "100%" }} overflow={"hidden"}>
            <Grid item xs={9}>
              <Grid container flexGrow={1} direction={"row"} height={"70%"}>
                <Grid item width={"50%"}>
                  <UserInfoFormInput user={user} />
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "50%",
                    my: 12,
                    height: "100%",
                    maxHeight: "475px",
                  }}
                >
                  <Typography variant="h5" gutterBottom mb={3}>
                    My Friends
                  </Typography>
                  {user.friends && <UserFriends friends={user.friends} />}
                </Grid>
              </Grid>
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
