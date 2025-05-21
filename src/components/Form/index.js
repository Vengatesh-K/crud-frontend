// const Form = () => {

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCards } from "../../redux/cardSlice";
import { createCards, fetchCards } from "../../redux/actions";

const CrudForm = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    image: null,
    status: "",
  });
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector((state) => state.cards);

  console.log(cards, 'cards')

  useEffect(() => {
   dispatch(fetchCards());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...formData, id: editId } : item
        )
      );
      setEditId(null);
    } else {
      setItems([...items, { ...formData, id: Date.now().toString() }]);

      dispatch(createCards(formData));
    }

    setFormData({
      id: "",
      name: "",
      description: "",
      image: null,
      status: "active",
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Item Management
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f5f5f5",
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editId ? "Update Item" : "Add Item"}
        </Button>
      </form>

      <List sx={{ mt: 3 }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(item)}>
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  {item.description && <div>{item.description}</div>}
                  <div>Status: {item.status}</div>
                  {item.image && <div>Image: {item.image.name}</div>}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CrudForm;
