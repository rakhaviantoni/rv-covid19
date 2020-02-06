import React from 'react';
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';
import { AuthApi } from '../../api'
import { setCookie } from '../../utils/cookies';
import { SITE_COOKIES, MENU, ASSETS } from '../../config';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-fa/eye';
import eyeSlash from '@iconify/icons-fa/eye-slash';

class Login extends React.Component {
  
  state = {
    form: {
      username: '',
      password: '',
    },
    passwordType: 'password',
    loading: false
  }

  componentDidMount() {}

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

  handleSubmit = async (e) => {
    e.preventDefault()
    Toast.loading('Loading...', 1000, null, true)
    let { form, loading } = this.state
    if(!loading){
      await this.setState({ loading: true })
      const payload = form
      AuthApi.login(payload)
      .then(response => {
        if(response.data.status === 200){
          const data = response.data.data
          setCookie(SITE_COOKIES.USERNAME, form.username, 1)
          setCookie(SITE_COOKIES.TOKEN, data, 1)
          Toast.hide()
          this.props.history.push(MENU.APP)
        }
      }).catch(e => {
        Toast.hide()
        Toast.fail(e.response?e.response.data.message:JSON.stringify(e.message), 3, null, true)
        this.setState({ loading: false })
      })
    }
  }
  handleGoTo = (e) => {
    e.preventDefault()
    this.props.history.push(MENU.REGISTER)
  }
  render() {
    let { form, passwordType } = this.state
    return (
      <section className="section-login">
        <form onSubmit={ this.handleSubmit }>
          <div className="container">
            <img className="logo" src={ ASSETS.LOGO.brand } alt="brand-logo"/>
            <div className="title">Log in to your account</div>
            <div className="form">
              <div className="input-container">
              <input type="text" className="custom-field" placeholder="Username" onChange={ e => this.onChange(e, 'username') } value={ form.username } />
              </div>
              <div className="input-container">
              <input type={passwordType} className="custom-field" placeholder="Password" onChange={ e => this.onChange(e, 'password') } value={ form.password } />
              <span className="password__show" onClick={this.showHide}>{passwordType === 'text' ? <Icon icon={eyeIcon} width="15" height="15" /> : <Icon icon={eyeSlash} width="15" height="15" />}</span>
              </div>
              <a className="link" href="" onClick={ e => this.handleGoTo(e) }>Don't have an account?</a>
            </div>
          </div>
          <button className={ (form.username&&form.password) !== '' ? 'btn-submit fixed' : 'btn-submit fixed disabled' } type="submit">
            Login
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(Login);