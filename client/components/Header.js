import Link from "next/link";
import Navbar from "./NavBar";

const Header = () => {
  return (
    <header>
      <div className="bar">
        <Link href="/">EKart</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
