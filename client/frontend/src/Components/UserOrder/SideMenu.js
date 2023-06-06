import { Link } from "react-router-dom"

const SideMenu = () => {
    return (
        <div className="side-menu">
            <ul>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/your-orders">Your Orders</Link></li>
            </ul>
        </div>
    )
}

export default SideMenu