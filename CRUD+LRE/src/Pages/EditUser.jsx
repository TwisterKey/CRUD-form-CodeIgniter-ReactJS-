import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CopyRight from "../ui/CopyRight";
import { useState } from "react";
import { useEdit } from "../hooks/useEdit";
const componentstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditUser(props) {
  const { editUser, isEditing } = useEdit();
  console.log(props.data);
  const [username, setUsername] = useState(props.data.username);
  const [email, setEmail] = useState(props.data.secret);
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {};
    if (username.trim() !== "") {
      newUserData.username = username;
    }

    if (email.trim() !== "") {
      newUserData.email = email;
    }

    if (password.trim() !== "") {
      newUserData.password = password;
    }
    console.log(props.data);
    console.log(newUserData);
    editUser({ newUserData, user_id: props.data.user_id });
    props.onClose();
  };

  return (
    <Container component="main" maxWidth="xs" sx={componentstyle}>
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
          <SystemUpdateAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Repeat Password"
            type="password"
            id="rePassword"
            autoComplete="current-password"
          /> */}
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
            Edit User
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
