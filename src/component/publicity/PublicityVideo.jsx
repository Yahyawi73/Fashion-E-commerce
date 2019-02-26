import React, { Component } from 'react';
import { map } from 'lodash';
import PublicityCard from './PublicityCard';
import videowebm from '../../img/pub.webm';


class App extends Component {
  handleCard = () => {
    const section = [1, 2, 3];
   return map(section,(n) =>  (<div key={n} className="col-1-of-3"><PublicityCard number={n}/></div>))
  }
  render() {
    return (
      <section className="section-video">
      <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
              <source src={videowebm} type="video/webm" />
              Your browser is not supported!
          </video>
      </div>
      <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">
              We make people geniusely happy
         </h2>
      </div>

  </section>
    );
  }
}

export default App;