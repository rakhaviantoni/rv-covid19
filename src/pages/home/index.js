import React from 'react';
import { withRouter } from 'react-router-dom'
import { Popconfirm, Toast } from 'antd-mobile';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { CarApi, ReservationApi, BACK_TO_LOGIN } from '../../api';
import { dateOnly } from '../../utils/formatter/datetime';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-ant-design/close-circle-outlined';

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: [],
      form: {
        registration_no: '',
        customer: '',
        date: ''
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

  onChange = (e, fname) => {
    let { form } = this.state
    form[fname] = e.target.value
    this.setState({ form })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    Toast.loading('Loading...', 1000, null, true)
    let { form } = this.state
    ReservationApi.reserve(form)
    .then(response => {
      console.log(response)
      if(response.data.status === 200){
        Toast.hide()
        Toast.success(response.data.message, 2, null, true)
        this.fetchCarList()
        this.setState({ visiblePopup: false, form: { customer: '', date: '' } })
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    })
  }

  cancel = (e, id) => {
    e.preventDefault()
    Toast.loading('Loading...', 1000, null, true)
    ReservationApi.cancel(id)
    .then(response => {
      console.log(response)
      if(response.data.status === 200){
        Toast.hide()
        Toast.success(response.data.message, 2, null, true)
        this.fetchCarList()
        this.setState({ visiblePopup: false, form: { customer: '', date: '' } })
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    })
  }

  render() {

    let { data, list, form, selectedDay, visiblePopup } = this.state
    
    const handleTogglePopup = (value, data) => {
      this.setState({ visiblePopup: value, data, form: { registration_no: data.registration_no } })
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
              {/* <div className="input-container">
                <input type="text" format="yyyy-mm-dd" className="custom-field" placeholder="Date" onChange={ e => this.onChange(e, 'date') } value={ form.date } />
              </div> */}
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
                  // <Popconfirm
                  //   title="Are you sure cancel this reservation?"
                  //   onConfirm={ e => this.cancel(e, item.id) }
                  //   okText="Yes"
                  //   cancelText="No"
                  // >
                    <button className="btn-next">
                      Cancel Reservation
                    </button>
                  // </Popconfirm>
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
            <div className="title">Reservation form</div>
            <form onSubmit={ this.handleSubmit }>
              <div className="form">
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Registration No" onChange={ e => this.onChange(e, 'registration_no') } value={ form.registration_no } />
                </div>
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Customer" onChange={ e => this.onChange(e, 'customer') } value={ form.customer } />
                </div>
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Date" onChange={ e => this.onChange(e, 'date') } value={ form.date } />
                </div>
              </div>
              <button className={ (form.registration_no&&form.customer&&form.date) !== '' ? 'btn-submit' : 'btn-submit disabled' } type="submit">
                Reserve
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);