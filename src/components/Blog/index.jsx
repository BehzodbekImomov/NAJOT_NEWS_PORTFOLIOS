import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { request } from "../../server/Request";
import "./Blog.scss";

const PopularBlog = () => {
  const [blog, setBlog] = useState([]);

  const getBlog = useCallback(async () => {
    try {
      let { data } = await request("post/lastones");
      setBlog(data);
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    getBlog();
  }, [getBlog]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
        
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
     
    ],
  };
  return (
    <div className="container">
      <div className="d-flex align-items-center pt-5 justify-content-between">
        <h2 className="p-0">Popular blogs</h2>
      </div>
      <ul className="contentCard g-flex gap-5">
        <Slider {...settings}>
          {blog.map((b) => (
            <li key={b._id} className="card ">
              <img className="img-fluid" src="/blog.svg" alt="" />
              <p className="title">
                <span>{b.title}</span>
                {b.createdAt}
              </p>
              <h3 className="card-title">{b.tags}</h3>
              <p>{b.description}</p>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default PopularBlog;
