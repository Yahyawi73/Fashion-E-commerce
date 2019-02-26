import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import FavorisPage from './component/Profil/FavorisPage'
import SignIn from './component/Auth/signIn';
import SignUp from './component/Auth/signUP';
import App from './component/App';
import NavBar from './component/NavBar';
import Footer from './component/footer/Footer';
import PublicityPage from './component/publicity/PublicityPage';
import withSession from './component/session/withSession';
import Order from './component/Order/Order';

const Root = ({ refetch, session }) => (
    <Router>
      <Fragment>
        <NavBar session={session} />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
          <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
          <Route path="/publicity" component={PublicityPage} />
          <Route path="/favoris" component={FavorisPage} />
          <Route path="/order" component={Order} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  )
  
  const RootWithSession = withSession(Root);

  export default RootWithSession;