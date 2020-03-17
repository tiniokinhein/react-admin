import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../store/actions/authActions'
import classnames from 'classnames'
import { withRouter , Link } from 'react-router-dom'


class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to ...
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmitRegister = e => {
        e.preventDefault()

        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(userData, this.props.history)
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
                                            Register
                                        </h4>
                                    </div>
                                    <form 
                                        noValidate 
                                        onSubmit={this.onSubmitRegister}
                                        className=""
                                    >
                                        <div className="field-group mb-3">
                                            <input
                                                onChange={e => this.setState({ name: e.target.value })}
                                                value={this.state.name}
                                                error={errors.name}
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                className={
                                                    classnames("form-control bg-light rounded-0 border-light px-4", { invalid: errors.name })
                                                }
                                                style={{
                                                    height: '3.5rem'
                                                }}
                                            />
                                        </div>
                                        <div className="field-group mb-3">
                                            <input
                                                onChange={e => this.setState({ email: e.target.value })}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                className={
                                                    classnames("form-control bg-light rounded-0 border-light px-4", { invalid: errors.email })
                                                }
                                                style={{
                                                    height: '3.5rem'
                                                }}
                                            />
                                            <span className="text-danger"><small>{errors.email}</small></span>
                                        </div>
                                        <div className="field-group mb-3">
                                            <input
                                                onChange={e => this.setState({ password: e.target.value })}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                                className={
                                                    classnames("form-control bg-light rounded-0 border-light px-4", { invalid: errors.password })
                                                }
                                                style={{
                                                    height: '3.5rem'
                                                }}
                                            />
                                            <span className="text-danger"><small>{errors.password}</small></span>
                                        </div>
                                        <div className="field-group mb-4">
                                            <input
                                                onChange={e => this.setState({ password2: e.target.value })}
                                                value={this.state.password2}
                                                error={errors.password2}
                                                id="password2"
                                                name="password2"
                                                type="password"
                                                placeholder="Confirm Password"
                                                className={
                                                    classnames("form-control bg-light rounded-0 border-light px-4", { invalid: errors.password2 })
                                                }
                                                style={{
                                                    height: '3.5rem'
                                                }}
                                            />
                                            <span className="text-danger"><small>{errors.password2}</small></span>
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
                                                Create Account
                                            </button>
                                        </div>
                                    </form>
                                    <div
                                        className="col-12 pt-5 text-center"
                                    >                                
                                        <p className="mb-3 text-secondary">
                                            Already have an account? <br />
                                            <Link 
                                                to="/login" 
                                                className="text-uppercase text-dark font-weight-bold text-decoration-none"
                                            >Log in</Link>
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
        )
    }
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps, { registerUser }
)(withRouter(Register))