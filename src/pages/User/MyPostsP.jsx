import { useCallback, useEffect, useState } from "react"
import { Container, Pagination } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import { limit } from "../../constants"
import { request } from "../../server/Request"

const MyPostsP = () => {
const [posts,setPosts]=useState([])

const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [postLoading, setPostLoading] = useState(false);

useEffect(() => {
  document.querySelector("head title").textContent = "All Posts";
});

const getPosts = useCallback(async () => {
  setPostLoading(true);
  try {
    let { data } = await request(
      `post/user?page=${page}&limit=${limit}&search=${search}`
    );
    let { data: totalData } = await request(`post/user?search=${search}`);
    setPosts(data?.data);
    console.log(data);
    setTotal(totalData.data.length);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setPostLoading(false);
  }
}, [search, page]);

useEffect(() => {
  getPosts();
}, [getPosts]);

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





console.log(posts);

  return (
    <Container>
        <section>
        <div className="input-group m-auto mb-5 mt-5">
          <input
            onChange={handleSearch}
            value={search}
            placeholder="Search..."
            type="text"
            className="form-control"
          />
        </div>
      </section>
      <section>
        <ul className="CardContent">
          {postLoading ? (
            <Loading />
          ) : (
            posts.map(({ _id, title, createdAt, category, description }) => (
              <Link to={`/post/${_id}`} key={_id} className="card  ">
                <img className="img-fluid" src="/blog.svg" alt="" />
                <div className="mx-4">
                  <p className=" me-5 title ">
                    <span className="">{title}</span> {"| "}
                    {createdAt}
                  </p>
                  <h3>{category?.name}</h3>
                  <p>{description}</p>
                </div>
              </Link>
            ))
          )}
          {pagination}
        </ul>
      </section>
    </Container>
  )
}

export default MyPostsP