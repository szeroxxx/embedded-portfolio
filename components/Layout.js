import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 relative">
      {router.pathname !== '/' && (
        <Link href="/">
          <button className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm text-black 
            px-6 py-3 rounded-full shadow-lg 
            hover:bg-white hover:scale-105 
            active:scale-95
            transition-all duration-300 ease-in-out
            z-50 
            flex items-center gap-2
            animate-fadeIn">
            <svg 
              className="w-5 h-5 transform rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Back
          </button>
        </Link>
      )}
      <main className="max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
