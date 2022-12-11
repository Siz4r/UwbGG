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

const theme = createTheme();

export const RegisterPage = () => {
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
              onSubmit={() => {}}
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
                  <Link href="#" variant="body2">
                    Go back to login page
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
