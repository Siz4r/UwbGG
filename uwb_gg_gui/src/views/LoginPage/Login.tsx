import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Copyright } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginWithCredentials } from "../../store/Users/api";
import { useNavigate } from "react-router";
import { RouterPathsKeys } from "../../types/RouterPaths";
import { parseErrorToString } from "../../core/parseErrorToString";
import { useSelectUser } from "../../core/hooks/SelectUser/SelectUser";
import { LoadingWrapper } from "../../core/wrappers/LoadingWrapper";

const theme = createTheme();

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelectUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      try {
        const result = await dispatch(
          loginWithCredentials({ nick: username, password: password })
        );

        if (loginWithCredentials.rejected.match(result)) {
          throw result.payload;
        }

        navigate(RouterPathsKeys.CHATS);
      } catch (e) {
        parseErrorToString(e, setFormError);
      }
    }
  };

  return (
    <LoadingWrapper isLoading={loading}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100%", width: "100%" }}>
          <CssBaseline />
          <Grid
            item
            width={"100%"}
            height={"100%"}
            component={Paper}
            elevation={6}
          >
            <Box
              sx={{
                py: 8,
                // mx: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={submitHandler}
                sx={{ mt: 1 }}
                height={"100%"}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nick"
                  label="Nick"
                  name="nick"
                  autoComplete="nick"
                  autoFocus
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link variant="body2" onClick={() => navigate(RouterPathsKeys.REGISTER)}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
                {formError ? (
                  <p color="red" className="mt-2 mb-0 w-100 text-center">
                    {formError}
                  </p>
                ) : null}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </LoadingWrapper>
  );
};
