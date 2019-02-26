import React from 'react';
import logo from '../../img/logo-green-2x.png';

const Footer = () => (
    <footer className="footer">
        <div className="footer__logo-box">
            <img src={logo} alt="Full logo" className="footer__logo"></img>
        </div>
        <div className="row">
            <div className="col-1-of-2">
                <div className="footer__navigation">
                    <ul className="footer__list">
                        <li className="footer__item">
                            <a href="/" className="footer__link">Company</a>
                            <a href="/" className="footer__link">Contact us</a>
                            <a href="/" className="footer__link">Carrers</a>
                            <a href="/" className="footer__link">Privacy policy</a>
                            <a href="/" className="footer__link">Terms</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-1-of-2">
            <p className="footer__copyright">
            Built my <a href="/" className="footer__link" >Yahyawi Abdel fatteh</a>
            </p>
            </div>
        </div>
    </footer>
)

export default Footer;