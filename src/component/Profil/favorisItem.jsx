import React from 'react';
import { Link } from 'react-router-dom';
import { GET_SOUS_PRODUCT } from '../../queries/getSousProduct';
import { Query } from "react-apollo";

const favorisItem = ({ _id }) => (

    <Query query={GET_SOUS_PRODUCT} variables={{ _id: _id }}>
        {({ error, loading, data }) => {
            if (loading) return <div>Loainding...</div>
            if (error) return <div>Error</div>
            return (
                <div>
                    <div className="card">

                        <div className="card__side card__side--front-product">

                            < a href="/signin" className="card-link" >
                                <div className={`card__picture-product`} >
                                    &nbsp;
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="card__details">
                        <ul>
                            <li>
                                <Link to={`/sousProduct/${data.getSousProduct._id}`}>
                                    {data.getSousProduct.name}
                                </Link>
                            </li>
                            <li>{data.getSousProduct.price}$</li>
                        </ul>
                    </div>
                </div>
            )
        }}
    </Query>

)

export default favorisItem;