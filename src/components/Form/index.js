import { useCallback, useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  createCards,
  updateCard,
  deleteCard,
  BaseURL,
} from "../../redux/actions";
import Cards from "../Cards";

const CrudForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "",
  });
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector((state) => state.cards);

  console.log("Cards from Redux:", cards);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.image) formDataToSend.append("image", formData.image);
    formDataToSend.append("status", formData.status);

    try {
      if (editId) {
        await dispatch(
          updateCard({ _id: editId, formData: formDataToSend })
        ).unwrap();
        setEditId(null);
      } else {
        await dispatch(createCards(formDataToSend)).unwrap();
      }
      // Reset form data
      setFormData({
        name: "",
        description: "",
        image: null,
        status: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEdit = (card) => {
    setFormData({
      name: card.name,
      description: card.description || "",
      image: null,
      status: card.status || "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setEditId(card._id);
  };

  const handleDelete = async (_id) => {
    try {
      await dispatch(deleteCard(_id)).unwrap();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Box sx={{ width: 500, mx: "auto", p: 2 }}>
      <Typography variant="h4" align="center">
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
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f5f5f5",
          }}
        />
        <TextField
          fullWidth
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {editId ? "Update Item" : "Add Item"}
        </Button>
      </form>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Cards
        cards={cards}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default CrudForm;
