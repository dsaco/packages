import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header className="text-lg">Home</header>
      <Link to="/ripple">ripple</Link>
      <br />
      <Link to="/img">img</Link>
      <br />
      <Link to="/pagination">pagination</Link>
      <br />
      <Link to="/modal">modal</Link>
      <br />
      <Link to="/switch">switch</Link>
    </div>
  );
}
