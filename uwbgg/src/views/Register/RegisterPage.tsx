import {
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
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {useState} from "react";
import {register} from "../../store/Users/api";
import {RouterPathsKeys} from "../../types/RouterPaths";
import {parseErrorToString} from "../../core/parseErrorToString";
import {useNavigate} from "react-router";

const theme = createTheme();

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length >= 8 &&
        nick.length >= 3 &&
        firstName && lastName && email) {
      try {
        const result = await dispatch(
            register({
              nick: nick,
              password: password,
            firstName: firstName,
            lastName: lastName,
            email: email})
        );

        if (register.rejected.match(result)) {
          throw result.payload;
        }

        navigate(RouterPathsKeys.LOGIN);
      } catch (e) {
        parseErrorToString(e, setFormError);
      }
    }
  }

  return (
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
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => onRegister(e)}
              sx={{ mt: 1 }}
              height={"100%"}
              maxWidth={"600px"}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First name"
                type="firstName"
                id="firstName"
                autoComplete="current-password"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last name"
                type="lastName"
                id="lastName"
                autoComplete="current-password"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="nick"
                label="Nick"
                type="nick"
                id="nick"
                autoComplete="current-password"
                value={nick}
                onChange={(e) => setNick(e.currentTarget.value)}
                error={nick.length < 3}
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
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                error={password.length < 8}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="uwbgg/src/views/Register#" variant="body2">
                    Go back to login page
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {formError && <Typography>{formError}
            </Typography>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
