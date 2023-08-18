import { useState } from "react";
import { useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { request } from "../../server/Request";
import "./Hero.scss";

const Hero = () => {
  const [lates, setLates] = useState([]);

  const getData = useCallback(async () => {
    try {
      let { data } = await request("post/lastone");
      setLates(data);
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="hero fluid">
        <div className="hero_content ">
      <Container>
        
          <h2>
            Posted on <span>{lates.name}</span>
          </h2>
          <h1>{lates.title}</h1>
          <p>
            By<span> James West </span>| {lates.createdAt}
          </p>
          <p>
          {lates.description}
          </p>
          <button>Read More {">"}</button>
      </Container>
        </div>
    </div>
  );
};

export default Hero;
