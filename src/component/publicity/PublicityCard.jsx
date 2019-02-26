import React from 'react';
import image from '../../img/fashio-girl.jpg'

const PublicityCard = ({number}) => (
<div className="card">
                  <div className="card__side card__side--front">
                      <div className={`card__picture card__picture--${number}`} >
                      <img className={`card__picture card__picture--${number}`} src={image} alt="image5" />
                          &nbsp;
                     </div>
                      <h4 className="card__heading">
                          <span className={`card__heading-span card__heading-span--${number}`}>Women</span>
                      </h4>
                      <div className="card__details">
                          <ul>
                              <li>Fashion</li>
                          </ul>
                      </div>
                  </div>
                  <div className={`card__side card__side--back card__side--back-${number}`}>
                      <div className="card__cta">
                          <div className="card__price-box">
                              <p className="card__price-only">For You only</p>
                              <p className="card__price-value">Fashion</p>
                          </div>
                          <a href="/signup" className="btn btn--white">SignUp now !</a>
                          <div className="sign-in-link"><a href="/signin" >SigIn if you already have account</a></div>               
                      </div>
                  </div>
              </div>
)

export default PublicityCard;