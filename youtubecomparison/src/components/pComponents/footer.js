import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <div>
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Footer Content</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 s12">
                <h5 class="white-text">Thanks To</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Marco</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Leo</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Alex</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Jack</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Oliver</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2018 - A Codeworks Project by Christopher Buecklein
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

  export default Footer;