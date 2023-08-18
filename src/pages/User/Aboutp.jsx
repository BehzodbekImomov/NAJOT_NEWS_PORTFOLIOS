import "./style.scss";
const Aboutp = () => {
  return (
    <div className="container">
      <div className="about_hero">
        <ul className="about_card">
          <li>
            <span>Our mision</span>
            <h3 className="pt-5 pb-3">
              Creating valuable content for creatives all around the world
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </li>
          <li>
            <span>Our Vision</span>
            <h3 className="pt-5 pb-3">
              A platform that empowers individuals to improve
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </li>
        </ul>
        <ul className="about_cards">
          <li>
            <div className="about_content">
              <h3>Our team of creatives</h3>
              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
            <img className="img-fluid" src="/about2.svg" alt="" />
          </li>
          <li>
          <img className="img-fluid" src="/about1.svg" alt="" />
            <div className="about_content">
              <h3>Our team of creatives</h3>
              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat.
              </p>
            </div>
           
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aboutp;
