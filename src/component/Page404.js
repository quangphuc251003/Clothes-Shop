import Logo from '../images/home/logo.png'
import Pages404 from '../images/404/404.png'
import { Link } from 'react-router-dom'
function Page404() {
    return (
        <div className="container text-center">
            <div className="logo-404">
                <Link to="/"><img src={Logo} alt="" /></Link>
            </div>
            <div className="content-404">
                <img src={Pages404} className="img-responsive" alt="" />
                <h1><b>OPPS!</b> We Couldn’t Find this Page</h1>
                <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
                <h2><Link to="index.html">Bring me back Home</Link></h2>
            </div>
        </div>
    )
}

export default Page404