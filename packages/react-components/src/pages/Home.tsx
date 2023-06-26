import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header className="text-lg">Home</header>
      <Link to="/ripple">ripple</Link>
    </div>
  );
}
