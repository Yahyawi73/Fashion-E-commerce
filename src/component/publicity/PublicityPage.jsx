import React, { Component } from 'react';
import { map } from 'lodash';
import PublicityCard from './PublicityCard';
import PublicityVideo from './PublicityVideo';


class App extends Component {
  handleCard = () => {
    const section = [1, 2, 3];
    return map(section, (n) => (<div key={n} className="col-1-of-3"><PublicityCard number={n} /></div>))
  }
  render() {
    return (
      <div>
        <PublicityVideo />
        <section className="section-home" id="section-home">
          <div className="u-center-text">
          </div>
          <div className="row">
            {
              this.handleCard()
            }

          </div>
          <div className="u-center-text u-margin-bottom-small">
            <a href="/" className="btn btn--green">Discover our products</a>
          </div>
        </section>
      </div>

    );
  }
}

export default App;