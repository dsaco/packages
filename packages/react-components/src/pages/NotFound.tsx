import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className="flex justify-center">
        <div className="text-2xl font-bold">
          <span className="px-4 border-r border-gray-300">404</span>
        </div>
        <div className="pl-4">
          <div className="text-xl text-gray-400">
            Sorry, we couldn’t find the page you’re looking for.
          </div>
          <Link to="/">
            <div className="mt-4 text-indigo-600 text-sm font-normal">
              <span>←</span> Back to home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
