import React from 'react';
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';
import { MENU } from '../../config';
import { AuthApi } from '../../api';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-fa/eye';
import eyeSlash from '@iconify/icons-fa/eye-slash';

class Register extends React.Component {
  state = {
    form: {
      username: '',
      password: '',
    },
    passwordType: 'password',
    msg: '',
    hasResponse: false,
    loading: false
  }

  onChange = (e, fname) => {
    let { form } = this.state
    form[fname] = e.target.value
    this.setState({ form })
  }
  
  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      passwordType: this.state.passwordType === 'text' ? 'password' : 'text'
    })  
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    Toast.loading('Loading...', 1000, null, true)
    let { form } = this.state
    AuthApi.register(form)
    .then(response => {
      console.log(response)
      if(response.data.status === 200){
        Toast.hide()
        Toast.success('Account has been created', 3, null, true)
        // this.setState({ hasResponse: true })
        // setTimeout(() => {
        //   this.setState({ hasResponse: false })
        // }, 3000)
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
      // this.setState({ msg: err.response.data.msg })
      // setTimeout(() => {
      //   this.setState({ msg: '' })
      // }, 3000)
    })
  }
  handleGoTo = (e) => {
    e.preventDefault()
    this.props.history.push(MENU.LOGIN)
  }

  render() {
    let { form, passwordType, msg, hasResponse, loading } = this.state
    return (
      <section className="section-login section-login--forgot_password">
        <form onSubmit={ this.handleSubmit }>
          <div className="container">
            <div className="title">Register new account</div>
            <div className="form">
              <div className="input-container">
                <input type="text" className="custom-field" placeholder="Username" onChange={ e => this.onChange(e, 'username') } value={ form.username } />
              </div>
              <div className="input-container">
                <input type={passwordType} className="custom-field" placeholder="Password" onChange={ e => this.onChange(e, 'password') } value={ form.password } />
                <span className="password__show" onClick={this.showHide}>{passwordType === 'text' ? <Icon icon={eyeIcon} width="15" height="15" /> : <Icon icon={eyeSlash} width="15" height="15" />}</span>
              </div>
              { 
                hasResponse &&
                <p className="response">
                  Account has been created.
                </p>
              }
              { 
                msg &&
                <p className="response--error">
                  { msg === 'already_exist' ? 'Account already exist.' : msg }
                </p>
              }
              <a className="link" href="" onClick={ e => { e.preventDefault(); this.props.history.push(MENU.LOGIN); } }>Back to login</a>
            </div>
            {/* <a href="" className="response" onClick={ e => { e.preventDefault(); this.props.history.push(MENU.LOGIN); } }>Back to login</a> */}
          </div>
          <button type="submit" className={ (form.username&&form.password) !== '' ? 'btn-submit fixed' : 'btn-submit fixed disabled' } disabled={ (form.username&&form.password) === '' }>Register</button>
        </form>
      </section>
    );
  }
}

export default withRouter(Register);