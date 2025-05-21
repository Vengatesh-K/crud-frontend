import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { BaseURL } from "../../redux/actions";

const Cards = React.memo(({ cards, handleEdit, handleDelete }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: 600,
      mx: "auto",
      mt: 3,
      "& > :not(style) + :not(style)": {
        mt: 3,
      },
    }}
  >
    {cards?.map((card) => (
      <Card key={card._id} sx={{ borderRadius: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740" // Replace with your static image path
              alt="User"
              sx={{ width: 32, height: 32 }}
            />
          }
          action={
            <Chip
              label={card.status}
              size="small"
              color={"warning"}
              sx={{ mr: 1 }}
            />
          }
          title={card.name}
          sx={{
            py: 1,
            px: 2,
            "& .MuiCardHeader-action": {
              alignSelf: "center",
              mt: 0,
            },
          }}
        />

        {card.imageUrl && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "background.default",
              p: 1,
            }}
          >
            <img
              src={`${BaseURL}${card.imageUrl}`}
              alt={card.name}
              style={{
                maxWidth: 300,
                maxHeight: 300,
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          </Box>
        )}

        <CardContent sx={{ px: 2, py: 1 }}>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {card.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 2,
            py: 1,
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(card)}
            color="primary"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(card._id)}
            color="error"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>

        <Divider />
      </Card>
    ))}
  </Box>
));

export default Cards;
