import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const UserDialog = ({ open, onClose, updateUser, onSave }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateUser) {
      setFormData({
        name: updateUser.name || "",
        email: updateUser.email || "",
      });
    } else {
      setFormData({ name: "", email: "" });
    }
    setErrors(null);
  }, [updateUser, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await onSave(formData);
      setFormData({ name: "", email: "" });
      setErrors(null);
      onClose();
    } catch (error) {
      setErrors(error);
      console.error("Error saving user:", error);
      console.log(errors)
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "" });
    setErrors(null);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{updateUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} id="subscription-form">
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              disabled={loading}
              margin="dense"
              variant="standard"
              fullWidth
              autoFocus
              required
            />
            <TextField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              disabled={loading}
              margin="dense"
              variant="standard"
              fullWidth
              autoFocus
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} form="subscription-form">
            {loading ? "Saving" : updateUser ? "Update" : "add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDialog;