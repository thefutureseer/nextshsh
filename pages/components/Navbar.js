import Link from 'next/Link';
// import '../../styles/style.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <>Home</>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <>About</>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <>Contact</>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;