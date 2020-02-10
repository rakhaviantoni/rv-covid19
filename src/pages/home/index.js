import React from 'react';
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { CarApi, ReservationApi } from '../../api';
import { dateOnly } from '../../utils/formatter/datetime';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-ant-design/close-circle-outlined';

class Home extends React.Component {
  timeoutSearch = undefined;
  
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      data: {},
      list: [],
      search_text: '',
      form: {
        registration_no: '',
        customer: '',
        date: ''
      },
      selectedDay: undefined,
      isLoading: true,
      visiblePopup: false,
      visibleConfirm: false
    };
  }

  componentDidMount() {
    this.init();
  }
  
  init = () => {
    Toast.hide()
    this.fetchCarList()
  }

  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  fetchCarList = (date='') => {
    Toast.loading('Loading...', 1000, null, true)
    let { search_text } = this.state
    let searchLength = search_text.length
    let params = { q: searchLength > 0 ? search_text : '' }
    this.setState({ selectedDay: date })
    let data = { date: dateOnly(date) }
    CarApi.status(data, params)
    .then(response => {
      if(response.data.status === 200){
        let { data, list } = this.state
        list = response.data.data
        data = list[1]
        data ? this.setState({ data, list }) : this.setState({ list })
        Toast.hide()
        Toast.success(response.data.message, 2, null, false)
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, false)
    })

  }

  delaySearch = (e) => {
    let { search_text, selectedDay } = this.state
    this.setState({search_text:e.target.value})
    if(this.timeoutSearch){
      clearTimeout(this.timeoutSearch);
    }
    this.timeoutSearch = setTimeout(() => {
      if(search_text.length > 0 || search_text.length === 0) {
          this.fetchCarList(selectedDay ? dateOnly(selectedDay) : dateOnly(new Date()));
      }
    }, 500);
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
    let { form, selectedDay } = this.state
    ReservationApi.reserve(form)
    .then(response => {
      if(response.data.status === 200){
        Toast.hide()
        Toast.success(response.data.message, 2, null, true)
        this.fetchCarList(selectedDay ? dateOnly(selectedDay) : dateOnly(new Date()))
        this.setState({ visiblePopup: false, form: { registration: '', customer: '', date: '' } })
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
    Toast.loading('Loading...', 1000, null, true)
    let { data, selectedDay } = this.state
    let params = { registration_no: data.registration_no, date: selectedDay ? dateOnly(selectedDay) : dateOnly(new Date()) }
    ReservationApi.cancel(params)
    .then(response => {
      console.log(response)
      if(response.data.status === 200){
        Toast.hide()
        Toast.success(response.data.message, 2, null, true)
        this.fetchCarList(selectedDay ? dateOnly(selectedDay) : dateOnly(new Date()))
        this.setState({ visibleConfirm: false, form: { registration_no: '', customer: '', date: '' } })
      }
    }).catch(err => {
      Toast.hide()
      Toast.fail(err.response?err.response.data.message:JSON.stringify(err.message), 3, null, true)
    })
  }

  render() {

    let { data, list, form, selectedDay, visiblePopup, visibleConfirm } = this.state
    
    const handleTogglePopup = (value, data) => {
      this.setState({ visiblePopup: value, data, form: { registration_no: data.registration_no ? data.registration_no : '', customer: '', date: selectedDay ? dateOnly(selectedDay) : dateOnly(new Date()) } })
    }
    
    const handleToggleConfirm = (value, data) => {
      this.setState({ visibleConfirm: value, data, selectedDay })
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
            <div style={{ marginTop: 30, marginBottom: -20, textAlign: 'center', color: 'white' }}>
              <DayPicker onDayClick={this.fetchCarList} selectedDays={this.selectedDay} />
              <div className="input-container">
                <input type="text" className="search-field" placeholder="Search" onChange={ e => this.delaySearch(e) } />
              </div>
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
                    <button className="btn-next" onClick={ e => handleToggleConfirm(true, item) }>
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
            <div className="title">Reservation form</div>
            <form onSubmit={ this.handleSubmit }>
              <div className="form">
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Registration No" onChange={ e => this.onChange(e, 'registration_no') } value={ form.registration_no } readOnly />
                </div>
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Customer" onChange={ e => this.onChange(e, 'customer') } value={ form.customer } />
                </div>
                <div className="input-container">
                <input type="text" className="custom-field" placeholder="Date" onChange={ e => this.onChange(e, 'date') } value={ form.date } readOnly />
                </div>
              </div>
              <button className={ (form.registration_no&&form.customer&&form.date) !== '' ? 'btn-submit' : 'btn-submit disabled' } type="submit">
                Reserve
              </button>
            </form>
          </div>
        </div>

        <div className={ visibleConfirm ? "popup active" : "popup" } >
          <div className="content">
            { visibleConfirm && 
            <button className="btn-close" onClick={ e => handleToggleConfirm(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            <div className="title">Cancel reservation by {data.customer} at {selectedDay ? dateOnly(selectedDay) : dateOnly(new Date())}?</div>
            <button className="btn-confirmation" onClick={ e => handleToggleConfirm(false, {}) }>
              No
            </button>
            <button className="btn-confirmation--outline" onClick={ e => this.handleCancel(e) }>
              Yes
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);