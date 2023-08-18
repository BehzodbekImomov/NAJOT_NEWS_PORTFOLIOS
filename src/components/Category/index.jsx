import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { Link} from "react-router-dom";

import "./Category.scss";

const Category = ({ name, description,_id }) => {
  
  return (
    <Container>
      <div className="category_content">
        <Link to={`category?_id=${_id}`}>
          <div className="li">
            <img  src="/categoryIcon.svg" alt="" />
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </Link>
      </div>
    </Container>
  );
};

Category.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  _id: PropTypes.string,
};
export default Category;
