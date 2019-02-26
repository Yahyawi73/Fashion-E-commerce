import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { GET_PRODUCT } from '../../queries/getProduct';
import ProductCard from '../card/ProductCard';
import { map } from 'lodash';
// import LikeProuduct from './LikeProuduct';



const RecipePage = ({ match }) => {
    // const { _id } = match.params;
    return (
        <Query query={GET_PRODUCT} variables={{ _id: "5c59ed5892267b2300cc5b75" }}>
            {({ error, loading, data }) => {
                if (loading) return <div>Loainding...</div>
                if (error) return <div>Error</div>
                return (
                    <section className="section-product-page">
                        <div className="row">

                            {
                                map(data.getProduct.sousProducts,
                                    (sousProducts) => (<ProductCard sousProduct={sousProducts} />)
                                )
                            }


                        </div>
                    </section>
                )
            }}
        </Query>
    )
}

export default withRouter(RecipePage);