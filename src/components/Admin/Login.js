import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter , Link } from 'react-router-dom'
import classnames from 'classnames'
import { loginUser } from '../../store/actions/authActions'


class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    resetForm = () => {
        this.setState({
            email: '',
            password: '',
            errors: {}
        })
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to ....
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/') // push user to this page when they login
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmitLogin = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)

    }

    render() {
        const { errors } = this.state

        return (
            <div
                className="py-3"
                style={{
                    height: '100vh',
                    minHeight: '600px'
                }}
            >
                <div className="d-table w-100 h-100">
                    <div className="d-table-cell align-middle">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-10 col-md-8 col-lg-5 mx-auto">
                                    
                                    <div className="col-12 text-center">
                                        <h4
                                            className="text-uppercase mb-4 font-weight-bolder text-dark"
                                            style={{
                                                fontSize: '2rem'
                                            }}
                                        >
                                            Login
                                        </h4>
                                        <form 
                                            noValidate 
                                            onSubmit={this.onSubmitLogin}
                                            className=""
                                        >
                                            <div className="field-group mb-3">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    error={errors.email}
                                                    className={
                                                        classnames(
                                                            "form-control bg-light rounded-0 border-light px-4", 
                                                            { invalid: errors.email || errors.emailnotfound }
                                                        )
                                                    }
                                                    style={{
                                                        height: '3.5rem'
                                                    }}
                                                />
                                                <span className="text-danger text-left d-block">
                                                    <small>
                                                        {errors.email}
                                                        {errors.emailnotfound}
                                                    </small>
                                                </span>
                                            </div>
                                            <div className="field-group mb-3">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                    error={errors.password}
                                                    className={
                                                        classnames(
                                                            "form-control bg-light rounded-0 border-light px-4",
                                                            { invalid: errors.password || errors.passwordIncorrect }
                                                        )
                                                    }
                                                    style={{
                                                        height: '3.5rem'
                                                    }}
                                                />
                                                <span className="text-danger text-left d-block">
                                                    <small>
                                                        {errors.password}
                                                        {errors.passwordIncorrect}
                                                    </small>
                                                </span>
                                            </div>
                                            <div className="field-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success border-success rounded-0 w-100 text-uppercase font-weight-bold text-light"
                                                    style={{
                                                        height: '3.5rem',
                                                        letterSpacing: '1px'
                                                    }}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            
                                            {/* Show message to user when can login after confirmed */}
                                            { 
                                                errors.user &&
                                                <div  
                                                    className="bg-danger p-5" 
                                                >
                                                    <button 
                                                        type="button" 
                                                        className="close text-white" 
                                                        onClick={this.resetForm}
                                                    >
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                    <div 
                                                        className="toast-body text-white"
                                                    >
                                                        {errors.user}
                                                    </div>
                                                </div>
                                            }

                                        </form>
                                        <div
                                            className="col-12 pt-5 text-center"
                                        >                                
                                            <p className="mb-3 text-secondary">
                                                Don't have an account? <br />
                                                <Link 
                                                    to="/register" 
                                                    className="text-uppercase text-dark font-weight-bold text-decoration-none"
                                                >Register</Link>
                                            </p>
                                            <Link 
                                                to="/" 
                                                className="text-uppercase text-dark font-weight-bold text-decoration-none"
                                            >
                                                Back to home
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps, { loginUser }
)(withRouter(Login))