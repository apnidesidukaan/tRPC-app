const Footer = () => {
  return (
    <footer className="bg-secondary text-color-text-inverse py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>BadiDukan</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>&copy; 2025 BadiDukan. All rights reserved.</p>
          </div>

          {/* Center Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>About Us</a>
            <a href="#" className="text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>Contact</a>
            <a href="#" className="text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>Privacy Policy</a>
            <a href="#" className="text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>Terms of Service</a>
          </div>

          {/* Right Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-color-info" aria-label="LinkedIn">
              <img src="linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>

            <a href="#" className="hover:text-color-primary" aria-label="Facebook">
              <img src="facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>

            <a href="#" className="hover:text-color-info" aria-label="Twitter">
              <img src="twitter.png" alt="Twitter" className="w-6 h-6" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;