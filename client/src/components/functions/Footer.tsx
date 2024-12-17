const Footer = () => {
  return (
    <footer className="py-4 md:py-6 bg-gray-900 text-center md:text-left font-libre text-sm text-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 space-y-2 md:space-y-0">
        <div>© 2024 Arcnet. All Rights Reserved.</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
