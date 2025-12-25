import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  setError,
  setLoading,
  setUsers,
  updateUser,
} from "../Store/UserSlice";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import UserRecord from "./UserRecord";
import userApi from "../utils/userAPI";
import { FeedbackContext } from "../Context/CreateContext";
import UserDialog from "./UserDialog";

export default function UserList() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);
  const [openDialog, setOpenDialog] = useState(false);
  const [UpdateUser, setUpdateUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showFeedback, showSuccessFeedback, showErrorFeedback } =
    useContext(FeedbackContext);

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const data = await userApi.getAll();
      dispatch(setUsers(data));
      showFeedback("Data Fetched...");
    } catch (err) {
      dispatch(setError(err));
      console.log("Failed to fetch user");
      showErrorFeedback("Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateAndUpdateUser = async (formData) => {
    try {
      if (UpdateUser) {
        const updatedUser = await userApi.update(UpdateUser.id, formData);
        dispatch(updateUser({ ...UpdateUser, ...updatedUser }));
        console.log("User updated successfully");
        showSuccessFeedback("User updated successfully");
      } else {
        const newUser = await userApi.create(formData);
        dispatch(addUser(newUser));
        console.log("User created successfully");
        showSuccessFeedback("User created successfully");
      }
      handleCloseDialog();
    } catch (err) {
      const errorMsg = err.message || "Failed to save user";
      dispatch(setError(errorMsg));
      console.error("Error:", errorMsg);
      showErrorFeedback(errorMsg);
    }
  };

  const handleDeleteUser = async (id, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${userName}"?`
    );

    if (!confirmed) return;

    try {
      await userApi.delete(id);
      dispatch(deleteUser(id));
      console.log("User deleted successfully");
      showFeedback("User deleted successfully");
    } catch (err) {
      dispatch(setError(err || "Failed to delete user"));
      console.log("Failed to delete user");
      showErrorFeedback("Failed to delete user");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleOpenDialog = (user = null) => {
    setUpdateUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUpdateUser(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"center"} gap={4} sx={{ m: 4 }}>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          disabled={loading}
        >
          Add User
        </Button>

        <Button variant="contained" onClick={fetchUsers} disabled={loading}>
          Refresh
        </Button>
      </Stack>
      <Stack>
        {loading ? (
          <Typography> Loading users...</Typography>
        ) : users.length === 0 ? (
          <Typography>No users found</Typography>
        ) : (
          <>
            <Paper elevation={6} sx={{ width: "50rem", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {["ID", "Name", "Email", "Actions"].map((title) => (
                        <TableCell
                          key={title}
                          align="right"
                          sx={{ minWidth: 100, fontWeight: 600 }}
                        >
                          {title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => {
                        return (
                          <UserRecord
                            key={user.id}
                            user={user}
                            handleOpenDialog={handleOpenDialog}
                            handleDeleteUser={handleDeleteUser}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        )}
      </Stack>

      <UserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        updateUser={UpdateUser}
        onSave={handleCreateAndUpdateUser}
      />
    </>
  );
}
