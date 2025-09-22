import Section from './Section';
import MainLogo from '../assets/MainLogo.png';
import Button from './Button';
import Arrow from '../assets/svg/Arrow';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10 text-n-2">
      <div className="container flex justify-around items-center gap-10 max-sm:flex-col">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <a href="#hero">
            <img src={MainLogo} width={230} height={28} alt="Buddy Forum Logo" />
          </a>
          <p className="mt-4 text-n-3 text-center max-w-xs">Your trusted platform for submitting and tracking complaints efficiently.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <h5 className="h5 mb-4 text-center">Quick Links</h5>
          <div className="flex flex-col">
            <a href="/" className="mb-3 flex items-center text-n-3">
              <Arrow /> Home
            </a>
            <a href="/complain" className="mb-3 flex items-center text-n-3">
              <Arrow /> Submit Complaint
            </a>
            <a href="/contact" className="mb-3 flex items-center text-n-3">
              <Arrow /> Contact Us
            </a>
            <a href="/roadmap" className="mb-3 flex items-center text-n-3">
              <Arrow /> Roadmap
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center gap-4">
          <h5 className="h5 mb-4 text-center">Follow Us</h5>
          <div className="flex gap-4">
            <a href="https://facebook.com" className="text-n-3" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-n-3" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" className="text-n-3" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com" className="text-n-3" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="container mt-8">
        <p className="text-center text-n-2 whitespace-nowrap">© {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </Section>
  );
};

export default Footer;
