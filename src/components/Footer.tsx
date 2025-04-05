
import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto border-t border-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-slate-200 text-sm mb-4 md:mb-0">
          © 2025 News Dashboard. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-slate-200 hover:text-slate-300">
            Terms
          </a>
          <a href="#" className="text-slate-200 hover:text-slate-300">
            Privacy
          </a>
          <a href="#" className="text-slate-200 hover:text-slate-300">
            Cookies
          </a>
          <div className="flex space-x-2">
            <a href="#" className="text-slate-200 hover:text-slate-300">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-200 hover:text-slate-300">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-200 hover:text-slate-300">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
