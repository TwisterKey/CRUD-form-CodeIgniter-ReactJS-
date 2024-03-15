import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CopyRight from "../ui/CopyRight";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";

export default function CreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const { createUser, isCreating } = useCreateUser();

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("salut");
    if (password === repassword) {
      createUser({
        username: name,
        email: email,
        password: password,
      });
      console.log({
        user_name: name,
        user_email: email,
        user_password: password,
      });
    } else alert("Invalid data");
  };

  const style = {
    position: "absolute",
    top: "50%",
    overflow: "auto",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container component="main" maxWidth="xs" sx={style}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Your Password"
            type="password"
            id="yourpassword"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Repeat your Password"
            type="password"
            id="reyourPassword"
            autoComplete="current-password"
          /> */}
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Repeat Password"
            type="password"
            id="rePassword"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create User
          </Button>
          <Button
            color="error"
            fullWidth
            variant="contained"
            onClick={() => props.onClose()}
          >
            Go back to home
          </Button>
        </Box>
      </Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
