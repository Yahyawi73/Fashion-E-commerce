import React, { Component } from "react";
import Slider from "react-slick";
import withSession from '../session/withSession';
import SousProductCard from '../sousProduct/SousProductCard';
import { map } from 'lodash';

class FavorisPage extends Component {

  state = {
    favoris: [],
    userName: '',
  }

  componentDidMount() {
    if (this.props.session.getCurrentUSer) {
      const { userName, favorites } = this.props.session.getCurrentUSer;
      this.setState({
        favoris: favorites,
        userName
      });
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="section-favoris">
        <h2> Single Item</h2>
        <div className="container">
          <Slider {...settings}>
            {
              map(this.state.favoris, (favoris) => (
                <div className="row">
                  <SousProductCard _id={favoris._id} />
                </div>
              )
              )
            }
          </Slider>
        </div>
      </div>
    );
  }
}

export default withSession(FavorisPage);