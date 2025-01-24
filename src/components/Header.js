import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="/images/myLogo.png" alt="logo" />
      </div>
      <div className="appTitle">
        <h1>مهامي</h1>
      </div>
    </div>
  );
}
