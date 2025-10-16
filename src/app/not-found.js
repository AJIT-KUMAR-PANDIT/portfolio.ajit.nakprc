import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <video
        src="/assets/404.mp4"
        autoPlay
        loop
        muted
        className="w-full max-w-md rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go back to Home
      </Link>
    </div>
  );
}