import { useCallback, useEffect, useState } from "react";
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

const CrudForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "",
  });
  const [editId, setEditId] = useState(null);

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
      setFormData({
        name: "",
        description: "",
        image: null,
        status: "",
      });
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
      <List sx={{ mt: 3 }}>
        {cards?.map((card) => (
          <ListItem
            key={card._id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(card)}>
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
                <IconButton onClick={() => handleDelete(card._id)}>
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
              primary={card.name}
              secondary={
                <>
                  {card.description && <div>{card.description}</div>}
                  <div>Status: {card.status}</div>
                  {card.imageUrl && (
                    <div>
                      <img
                        src={`${BaseURL}${card.imageUrl}`}
                        alt={card.name}
                        style={{ maxWidth: "100px", marginTop: "8px" }}
                      />
                    </div>
                  )}
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
