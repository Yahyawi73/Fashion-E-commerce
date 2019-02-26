import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const initialState = {
    userName: "",
    email: "",
    password: "",
    data: null,
    error: null,
};

class SignIn extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    state = { ...initialState }

    handleChange = event => {
        event.preventDefault();
        let formValue = {};
        const { name, value } = event.target;
        formValue[name] = value;
        this.setState({ ...formValue });
    }

    clearState = () => {
        this.setState({ ...initialState })
    }
    validateForm = () => {
        const { userName, email, password } = this.state;
        const isInValid = !userName || !email || !password;
        return isInValid;
    }
    render() {
        const { userName, email, password } = this.state;
        const { onSubmit } = this.props;
        console.log(onSubmit)
        return (
            <section className="section-sign">
                <div className="row">
                    <div className="sign">
                        <div className="sign__form">
                            <form className="form" onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit({
                                    variables: {
                                        inputUserSign: {
                                            userName,
                                            email,
                                            password
                                        }
                                    }
                                })
                                    .then(async ({ data: { signinUser: { token } } }) => {
                                        localStorage.setItem('token', token)
                                        await this.props.refetch();
                                        this.clearState();
                                        this.props.history.push('/');
                                    })
                            }}>
                                <div className="u-margin-bottom-medium">
                                    <h2 className="heading-secondary">
                                        Sign In
                                 </h2>
                                </div>

                                <div className="form__group">
                                    <input type="text" name="userName" placeholder="userName" className="form__input" value={userName} onChange={this.handleChange} />
                                    <label className="form__label">Full name</label>
                                </div>

                                <div className="form__group">
                                    <input type="email" name="email" placeholder="Email" className="form__input" value={email} onChange={this.handleChange} />

                                    <label className="form__label">Email address</label>
                                </div>

                                <div className="form__group">
                                    <input type="password" name="password" placeholder="password" className="form__input" value={password} onChange={this.handleChange} />
                                    <label className="form__label">Password</label>
                                </div>
                                <div className="form__group">
                                    {this.state.error && <p className="error-message"> Auth fail </p>}
                                    <button disabled={this.validateForm()} type="submit" className="btn btn--green">Next step &rarr;</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default withRouter(SignIn);