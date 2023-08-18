import { Form, InputGroup } from "react-bootstrap";
import "../Category/Category.scss";

const SearchCategory = () => {
  return (
    <div className="container1">
      <InputGroup>
        <Form.Control placeholder="Search..." aria-describedby="basic-addon1" />
      </InputGroup>
    </div>
  );
};

export default SearchCategory;
