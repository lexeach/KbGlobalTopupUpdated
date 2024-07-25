const Footer = () => {
  return (
    <>
      <footer className="bg-dashboard text-light py-4 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>
                To build futuristic products services leveraging cutting edge
                technologies which will solve fundamental problems of today in
                the financial services space. Weare on a mission, Weare
                conducting acharity which helps to everyone who join are
                thought.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.website.com" target="_blank">
                    Website
                  </a>
                </li>
                <li>
                  <a href="https://www.explorer.com" target="_blank">
                    Explorer
                  </a>
                </li>
                <li>
                  <a href="https://www.bridge.com" target="_blank">
                    Brige
                  </a>
                </li>
                <li>
                  <a href="https://www.dex.com" target="_blank">
                    DEX
                  </a>
                </li>
                <li>
                  <a href="https://www.supernode.com" target="_blank">
                    Supernode
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul>
                <li>
                  <a href="https://www.google.com/search?client=firefox-b-d&q=telegram">
                    Telegram
                  </a>
                </li>
              </ul>
              {/* <address>
                123 Street Name
                <br />
                City, Country
                <br />
                Phone: 123-456-7890
                <br />
                Email: example@example.com
              </address> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
