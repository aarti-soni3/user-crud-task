import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserRecord({
  user,
  handleOpenDialog,
  handleDeleteUser,
}) {
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
        <TableCell align={"right"}>{user.id}</TableCell>
        <TableCell align={"right"}>{user.name}</TableCell>
        <TableCell align={"right"}>{user.email}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => handleOpenDialog(user)}>
            <EditIcon color="primary"/>
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(user.id, user.name)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
