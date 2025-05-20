import CardList from "../../components/CardList";
import Form from "../../components/Form";


const Home = () => {

    return (
        <div className="container mt-5">
             <h2>Crud Card</h2>

      <div className="d-flex row justify-content-between align-items-center">
        <div>

          <Form />

        </div>
        <div>
      <CardList />

        </div>
      </div>
        </div>
    );
}

export default Home;