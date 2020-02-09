import React from 'react';
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { CarApi, BACK_TO_LOGIN } from '../../api';
import { dateOnly, datetimeToLocal } from '../../utils/formatter/datetime';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-ant-design/close-circle-outlined';

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: [],
      form: {
        comment: ''
      },
      selectedDay: '',
      isLoading: true,
      visiblePopup: false
    };
  }


  componentDidMount() {
    this.init();
  }
  
  init = () => {
    Toast.hide()
    this.fetchCarList()
  }

  fetchCarList = (date='') => {
    Toast.loading('Loading...', 1000, null, true)
    this.setState({ selectedDay: date })
    let data = { date: dateOnly(date) }
    CarApi.status(data)
    .then(response => {
      if(response.data.status === 200){
        let { data, list } = this.state
        list = response.data.data
        data = list[1]
        this.setState({ data, list })
        Toast.hide()
        Toast.success(response.data.message, 2, null, false)
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, false)
    })

  }

  formatDate = (d) => {
    let date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('-')
    return new Date(date)
  }

  onChange = (e, fname) => {
    let { form } = this.state
    form[fname] = e.target.value
    this.setState({ form })
  }

  handleSubmit = (e, id) => {
    e.preventDefault()
    this.setState({ loading: true })
    Toast.loading('Loading...', 1000, null, true)
    let { form, options } = this.state
    let params = { id_Car: id, comment: form.comment }
    // CarApi.comment(params)
    // .then(response => {
    //   console.log(response)
    //   if(response.data.status === 200){
    //     Toast.hide()
    //     Toast.success('Account has been created', 3, null, true)
    //   }
    // }).catch(err => {
    //   Toast.hide()
    //   Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    // })
  }

  render() {

    let { data, list, form, selectedDay, visiblePopup } = this.state
    
    const handleTogglePopup = (value, data) => {
      this.setState({ visiblePopup: value, data })
    }
    // const handleSignout = e => {
    //   BACK_TO_LOGIN(true)
    // }

    return (
      <React.Fragment>
        <section className="section-home">
          <div className="header" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 30 }}>
            <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div className="title">
                Car Rental
              </div>
              {/* <div className="profile" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-menu" onClick={ handleSignout } style={{ paddingRight: 0, marginLeft: 5 }}>
                  <Icon icon={signOut} color="white" />
                </button>
              </div> */}
            </div>
            <div style={{ marginTop: 30, marginBottom: 0, textAlign: 'center', color: 'white' }}>
            <DayPicker onDayClick={this.fetchCarList} selectedDays={selectedDay} />
            </div>
          </div>
          { 
            list.slice(0).reverse().map((item, key) => 
              <div className="body" key={ key }>
                <div className="title">
                  { item.registration_no }&nbsp;<div className="circle" title={item.color} style={{backgroundColor:item.color}}></div>
                </div>
                <div className="desc">
                  {item.customer===''?'Free':`Reserved by ${item.customer}`}
                </div>
                {
                  item.status === 'Free' ?
                  <button className="btn-next" onClick={ e => handleTogglePopup(true, item) }>
                    Reserve
                  </button> :
                  <button className="btn-next" onClick={ e => handleTogglePopup(true, item) }>
                    Cancel Reservation
                  </button>
                }
              </div>
            )
          }
        </section>

        <div className={ visiblePopup ? "popup active" : "popup" } >
          <div className="content">
            { visiblePopup && 
            <button className="btn-close" onClick={ e => handleTogglePopup(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            <div className="title">{data.registration_no}</div>
            <div className="scroll">
            {
              (data.comments && data.comments.length > 0) ?
              data.comments.slice(0).reverse().map((item, key) => 
                <div className="comment" key={ key }>
                  <div className="comment header">
                    <span className="author">{item.username}
                    </span>
                    <span className="at">
                    { datetimeToLocal(item.created_date) }
                    </span>
                  </div>
                  <div className="comment text">
                    {item.comment}
                  </div>
                </div>
              ) : 
              'No Comments'
            }
            </div>
            <form onSubmit={ e => this.handleSubmit(e, data.id) }>
              <input type="text" className="input-comment" placeholder="Add a comment..." onChange={ e => this.onChange(e, 'comment') } value={ form.comment } />
              <button type="submit" className="button-comment" disabled={ form.comment === '' }>Comment</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);