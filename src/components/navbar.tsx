import logoImg from '../assets/img/logo-nt.png'
// import logoImg from '../assets/img/logo.jpeg' 
const NavBar = () => {
  return (
    <>
      <nav className="navbar bg-dashboard">
        <div className="container-fluid d-flex justify-content-center">
          <div>
            <a className="navbar-brand" href="#">
              <img
                src={logoImg}
                alt="Logo"
                width="140"
                height="24"
                className="d-inline-block align-text-top"
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
