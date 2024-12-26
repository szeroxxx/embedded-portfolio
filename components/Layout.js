export default function Layout({ children }) {
    return (
      <div className="bg-black text-white min-h-screen px-6 py-10">
        <main className="max-w-5xl mx-auto">{children}</main>
      </div>
    );
  }
  