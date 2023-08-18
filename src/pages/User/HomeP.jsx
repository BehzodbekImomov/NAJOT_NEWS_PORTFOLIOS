import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { toast } from "react-toastify";
import PopularBlog from "../../components/Blog";

import Category from "../../components/Category";
import Hero from "../../components/Hero";
import Loading from "../../components/Loading";
import { request } from "../../server/Request";

const HomeP = () => {
  const [category, setCategory] = useState([]);
const [loading,setLoading]=useState(false)

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      let { data } = await request("category");
      setCategory(data.data);
    } catch (err) {
      toast.error(err.message);
    }finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const settings = {
   
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
  
      <div className="contentsHome">

     
      <Hero />

      <PopularBlog />

      <h2 className="text-center">Choose A Catagory</h2>
<Container>

      <Slider {...settings}>
        {loading?<Loading/>: category.map((categ) => (
          <Category key={categ._id} {...categ} />
        ))}
      </Slider>
</Container>
    </div>
    
  );
};

export default HomeP;
