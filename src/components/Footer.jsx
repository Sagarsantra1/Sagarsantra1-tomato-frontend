import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-screen h-fit px-6 sm:px-20 py-10 bg-gray-100 flex justify-between mt-5">
      <span className="font-bold text-xl sm:text-3xl mr-1 sm:mr-3 w-full">
        Tomato
      </span>
      <div className="w-fit space-y-5">
        <span className="text-sm font-semibold">SOCIAL LINKS</span>
        <div className="flex items-center justify-start space-x-5 w-fit h-fit">
          <Link to="/" className="text-gray-600 hover:text-black">
            <FaFacebookF size={20} />
          </Link>
          <Link
            to="https://twitter.com/SagarSa03495060"
            className="ml-3 text-gray-600 hover:text-black"
            target="_blank"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            to="https://www.instagram.com/sagarsantra397/"
            className="ml-3 text-gray-600 hover:text-black"
            target="_blank"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            to="https://www.linkedin.com/in/sagar-santra-8526051ab/"
            className="ml-3 text-gray-600 hover:text-black"
            target="_blank"
          >
            <FaLinkedin size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
