import React, { Component } from 'react';
import { map } from 'lodash';
import SousProductCard from './sousProduct/SousProductCard';
import { Query } from "react-apollo";
import { GET_PRODUCT } from '../queries/getProduct';

class App extends Component {

  render() {
    return (
      <section className="section-home" id="section-home">
        <div className="u-center-text">
        </div>
        <Query query={GET_PRODUCT} variables={{ _id: "5c6aa7eb68dd390b54cd9ecb" }}>
          {({ error, loading, data }) => {
            if (loading) return <div>Loainding...</div>
            if (error) return <div>Error</div>
            return (
              <section className="section-product-page">
                <div className="row">

                  {
                    map(data.getProduct.sousProducts,
                      (sousProducts) => (<div key={sousProducts._id} className="col-1-of-4"><SousProductCard _id={sousProducts._id} /></div>)
                    )
                  }
                </div>
              </section>
            )
          }}
        </Query>
        <div className="u-center-text u-margin-bottom-small">
          <a href="/" className="btn btn--green">Discover our products</a>
        </div>

      </section>
    );
  }
}

export default App;