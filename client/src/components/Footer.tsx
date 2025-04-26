import React from 'react';
import Logo from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-black body-font">
      <div className="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
        <a className="flex items-center justify-center font-medium text-white title-font md:justify-start">
          <img src={Logo} alt="JERSEY.FM logo" className='w-16 h-16' />
          <span className="ml-3 text-xl">JERSEY.FM</span>
        </a>
        <p className="mt-4 text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
          © {new Date().getFullYear()} JERSEY.FM RADIO
          <a href="https://jersey.fm" className="ml-1" rel="noopener noreferrer" target="_blank">
            jersey.fm
          </a>
        </p>
        <div className="inline-flex justify-center mt-4 space-x-4 sm:ml-auto sm:mt-0 sm:justify-start">
          {/* TikTok */}
          <a 
            href="https://tiktok.com/@jerseyfm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors duration-200 hover:text-pink-400"
            aria-label="Follow us on TikTok"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/jerseyclubfm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors duration-200 hover:text-purple-500"
            aria-label="Follow us on Instagram"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>

          {/* X (Twitter) */}
          <a 
            href="https://twitter.com/jerseyclubfm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors duration-200 hover:text-gray-400"
            aria-label="Follow us on X (Twitter)"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://facebook.com/jerseyfm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors duration-200 hover:text-blue-500"
            aria-label="Follow us on Facebook"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/jerseyfm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white transition-colors duration-200 hover:text-blue-300"
            aria-label="Join our Telegram channel"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22.02-.32-.05-.1-.17-.15-.32-.09-.37.15-7.45 4.76-7.57 4.84-.19.12-.36.17-.55.17-.14 0-.34-.04-.5-.2-.31-.3-.23-.69.15-1.08 1.15-1.14 2.53-2.54 2.53-2.54.5-.49.1-.54-.06-.83-.06-.1-.48-1.17-.67-1.59-.2-.45-.4-.39-.55-.4-.14-.01-.3-.01-.47-.01.17-.09.37-.14.58-.14.2 0 .39.05.55.15.45.29 1.38 1.13 3.04 2.49 2.13 1.74 2.61 2.1 3.79 2.34.48.1.92.09 1.27.06.39-.04 1.2-.25 1.37-.55.17-.3.17-.69.12-.55-.05-.27-.75-1.92-1.1-2.61-.3-.5-.6-.42-.75-.34-.19.08-.32.28-.12.54.1.14.42.49.64.74.41.46.87 1.13.87 1.13z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;