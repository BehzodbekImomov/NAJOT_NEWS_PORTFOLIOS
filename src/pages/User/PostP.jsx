import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../server/Request";
import "../../components/Blog/Blog.scss";
import Loading from "../../components/Loading";

const PostP = () => {
  const [loading, setLoading] = useState(false);
  let id = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    document.querySelector("head title").textContent = " Posts";
  });

  const getPost = useCallback(async () => {
    setLoading(true);
    try {
      let { data } = await request(`post/${id.id}`);
      setPost(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [id.id]);

  useEffect(() => {
    getPost();
  }, [getPost]);
console.log(post);
  return (
    <div className="container1">
      {loading ? (
        <Loading />
      ) : (
        <section>
          <div className="blog_card">
            <div className="container">
              <img className="pt-4 img-fluid" src="/blogcard.svg" alt="" />
              <div className="blog_card_content card">
                <div className="userInfo ">
                  <img className="img-fluid" src="/categoryIcon.svg" alt="" />
                  <div className="descBlog">
                    <h5>Andrew Jonson</h5>
                    <p>{post.updatedAt}</p>
                  </div>
                </div>

                <h3>{post?.tags}</h3>

                <p>
                  {post?.category?.name} <span>(#business, #screen, #life)</span>
                </p>
                <p>{post.description}</p>
                <p>{post.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PostP;
