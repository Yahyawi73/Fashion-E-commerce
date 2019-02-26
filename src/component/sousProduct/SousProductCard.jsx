import React from 'react';
import { Link } from 'react-router-dom';
import LikeSousProuduct from './LikeSousProuduct';
import { GET_SOUS_PRODUCT } from '../../queries/getSousProduct';
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";

import ADD_ONE_ITEM from '../../greaphql/Client/mutations/cart/addItem';

const SousProductCard = ({ _id }) => (

    <Query query={GET_SOUS_PRODUCT} variables={{ _id }}>
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
                            {
                                console.log(data)
                            }
                            <li><Link to={`/sousProduct/${data.getSousProduct._id}`}>{data.getSousProduct.name}</Link></li>
                            <li>{data.getSousProduct.price}$</li>
                            <li><LikeSousProuduct _id={data.getSousProduct._id} /></li>
                            <li>

                                <Mutation mutation={ADD_ONE_ITEM} variables={{ input: data.getSousProduct }}>
                                    {(addOneItem) => (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addOneItem();
                                            }}
                                        >
                                            <i className="material-icons">
                                                add_shopping_cart
                                            </i>
                                        </button>
                                    )}
                                </Mutation>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }}
    </Query>

)

export default SousProductCard;