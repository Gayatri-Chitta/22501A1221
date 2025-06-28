import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Layout({ children }) {
  const nav = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Shorten
          </Button>
          <Button color="inherit" component={RouterLink} to="/stats">
            Stats
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
}