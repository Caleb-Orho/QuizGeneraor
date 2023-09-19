
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="text-white font-bold text-2xl h-full flex items-center justify-center w-full absolute z-10 backdrop-blur-md">
      <ul className="grid gap-y-6 flex text-center">
        <Link to="/Quiz" >Download Youtube Video</Link>
        <li>About</li>
        <li>Contact</li>
        <li>Search</li>
      </ul>
    </nav>
  );
}


export default Menu;