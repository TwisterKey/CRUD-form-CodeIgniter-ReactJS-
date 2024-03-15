/* eslint-disable react/prop-types */
// import { Edit, Trash2 } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CircularProgress from "@mui/material/CircularProgress";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import EditUser from "../Pages/EditUser";
import { useState } from "react";
import { useDelete } from "../hooks/useDelete";

export default function UserComponent(props) {
  const { isDeleting, deleteUser } = useDelete();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDelete(id) {
    console.log(id);
    deleteUser({ id });
  }
  return (
    <TableRow key={props.item.user_id}>
      <TableCell>{props.item.username}</TableCell>
      <TableCell>{props.item.secret}</TableCell>
      <TableCell>{props.item.created_at}</TableCell>
      <TableCell>
        <IconButton
          //   onClick={() => handleEdit(props.item.id)}
          disabled={props.loadingId === props.item.user_id}
          onClick={handleOpen}
        >
          {props.loadingId === props.item.user_id ? (
            <CircularProgress size={24} />
          ) : (
            <SystemUpdateAltIcon />
          )}
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <div>
            <EditUser
              data={props.item}
              key={props.item.user_id}
              onClose={handleClose}
            />
          </div>
        </Modal>
        <IconButton
          onClick={() => handleDelete(props.item.user_id)}
          disabled={props.loadingId === props.item.user_id}
        >
          {props.loadingId === props.item.user_id ? (
            <CircularProgress size={24} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
