import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div>
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div className="col l4 s12">
                <h5 className="white-text">Thanks To</h5>
                <ul>
                  Pictures:
                  <li><a className="grey-text text-lighten-3" href="#!">photo3idea_studio / flaticon.com</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Freepik / flaticon.com</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Swifticons / flaticon.com</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2018 - A Codeworks Project by Christopher Buecklein
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

  export default Footer;