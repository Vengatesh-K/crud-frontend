import CardList from "../../components/CardList";
import CrudForm from "../../components/Form";
import "./index.css";

const Home = () => {
  return (
    <div className="mx-5">
      <h2>Crud Card</h2>

      <div className="main-container">
        <div className="form-container">
          <CrudForm />
        </div>
        <div className="list-container">
          <CardList />
        </div>
      </div>
    </div>
  );
};

export default Home;
