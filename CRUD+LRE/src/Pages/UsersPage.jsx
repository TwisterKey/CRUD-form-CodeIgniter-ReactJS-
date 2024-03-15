// import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import UserComponent from "../ui/UserComponent";
import Typography from "@mui/joy/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import CreateUser from "../Pages/CreateUser";
import useShowAllUsers from "../hooks/useUsers";
import Spinner from "../ui/Spinner";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../hooks/useLogout";

const data = [
  {
    user_id: 1,
    user_name: "John Doe",
    user_email: "john@example.com",
    created_at: "2023-04-01",
  },
  {
    user_id: 2,
    user_name: "Jane Doe",
    user_email: "jane@example.com",
    created_at: "2023-04-02",
  },
  {
    user_id: 3,
    user_name: "Mike Doe",
    user_email: "mike@example.com",
    created_at: "2023-04-03",
  },
];

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  tableContainer: {
    maxWidth: "100%",
    width: "800px", // Initial width
    margin: "0 auto", // Center horizontally
  },
  "@media (max-width: 800px)": {
    tableContainer: {
      width: "100%", // Adjust width for smaller screens
    },
  },
};

export default function UsersPage(props) {
  const navigate = useNavigate();

  // const [loadingId, setLoadingId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { users, isLoading } = useShowAllUsers();
  console.log(users);

  const { logout } = useLogout();

  if (isLoading)
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CssBaseline />
        <CircularProgress />
      </Box>
    );

  return (
    // <>

    <Container component="main" maxWidth="m">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Typography level="h2">CRUD OPERATIONS</Typography>
        <Typography level="h5">ReactJS + Codeigniter</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <IconButton
          size="large"
          color="white"
          style={{
            background: "red",
            borderRadius: "5px",
          }}
          onClick={() => logout()}
        >
          Log Out
          <LogoutIcon fontSize="large" />
        </IconButton>
      </div>
      <CssBaseline />
      <TableContainer component={Paper} style={styles.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.data.map((item) => (
                <UserComponent item={item} key={item.user_id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <IconButton
          size="large"
          color="white"
          style={{ background: "green", borderRadius: "5px" }}
          onClick={handleOpen}
        >
          Add anoter user
          <AddIcon fontSize="large" />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CreateUser onClose={handleClose} />
          </div>
        </Modal>
      </div>
    </Container>
    // </>
  );
}
