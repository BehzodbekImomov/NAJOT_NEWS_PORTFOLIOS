import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, Pagination } from "react-bootstrap";
import { useLocation  } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { limit } from "../../constants";
import { request } from "../../server/Request";

import "./style.scss";

const CategoriyesP = () => {
  const [category, setCategory] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [total, setTotal] = useState(0);

  let id = useLocation();
  let _id = id.search.split("=")[1];

  useEffect(() => {
    document.querySelector("head title").textContent = "Categories ";
  });

  const dataCategory = useCallback(async () => {
    setCategoryLoading(true);
    try {
      let { data } = await request(`category?_id=${_id}`);
      setCategory(data.data[0]);

    } catch (err) {
      toast.error(err.message);
    } finally {
      setCategoryLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    dataCategory();
  }, [dataCategory]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setCategoryLoading(true);
        let { data } = await request(
          `post?category=${_id}&page=${page}&limit=${limit}&search=${search}`
        );

        let { data: getData } = await request(`post?search=${search}&category=${_id}`);
        setTotal(getData.data.length);
        setAllCategory(data.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setCategoryLoading(false);
      }
    };
    getCategory();
  }, [search, page,_id]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handlePage = (i) => {
    setPage(i);
  };

  const items = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    items.push(
      <Pagination.Item
        key={i}
        onClick={() => handlePage(i)}
        active={i === page}
      >
        {i}
      </Pagination.Item>
    );
  }

  let pagination = total > limit && <Pagination>{items}</Pagination>;
  return (
    <div className="container">
      <section>
          <div key={category._id} className="desc ">
            <h3>{category?.name}</h3>
            <p className="text">{category.description}</p>
            <h5>Blog {">" + category.name} </h5>
          </div>
      </section>
      <section>
        <div className="container">
          <InputGroup className="mt-4 mb-4">
            <Form.Control
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      </section>
      <section>
        <div className="container">
          <ul className="CardContent ">
            {categoryLoading ? (
              <Loading />
            ) : (
              allCategory.map((c) => (
                <li className="card" key={c._id}>
                  <img className="img-fluid" src="/blog.svg" alt="" />
                  <div className="mx-4">
                    <span>{c?.category?.name}</span>
                    <h3>Top 6 free website mockup tools 2022</h3>
                    <p>{c?.category?.description}</p>
                  </div>
                </li>
              ))
            )}
            {pagination}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CategoriyesP;
