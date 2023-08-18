import { Link } from "react-router-dom"
import "./main.scss"
const Footer = () => {
  return (
    <footer>
      <div className="container1">
        <div className="footer_card">
          <div className="footer_desc">

          <p>Finstreet 118 2561 Fintown</p>
          <p>Hello@finsweet.com  020 7993 2905</p>
          </div>
          <ul>
            <li>
              <Link><img src="/fasebookLogo.svg" alt="" /></Link>
            </li> 
             <li>
              <Link><img src="/twitterlogo.svg" alt="" /></Link>
            </li> 
             <li>
              <Link><img src="/instagramLogo.svg" alt="" /></Link>
            </li> 
             <li>
              <Link><img src="/linkedinLogo.svg" alt="" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer