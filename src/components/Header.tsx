import { header, link } from "./Header.css";

const Header = () => {
  return (
    <nav className={header}>
        <img src="/logo.gif" alt="Logo de Hacker News" />
        <a href="" className={link}>Hacker News</a>
    </nav>
  )
}
export default Header