import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { fetchCards } from "../../redux/actions";

export default function CardList() {
  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table striped bordered hover variant="stripe">
      <thead>
        <tr className="table-dark">
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {cards.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">
              No cards available
            </td>
          </tr>
        ) : (
          cards.map((card, index) => (
            <tr key={card.cardId}>
              <td>{index + 1}</td>
              <td>{card.name}</td>
              <td>{card.description || "N/A"}</td>
              <td>
                {card.imageUrl ? (
                  <img
                    src={`http://localhost:7000${card.imageUrl}`}
                    alt={card.name}
                    style={{ maxWidth: "100px", height: "auto" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>{card.status || "N/A"}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
