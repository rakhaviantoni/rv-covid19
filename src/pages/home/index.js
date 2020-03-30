import React from 'react';
import { withRouter } from 'react-router-dom'
import { numberToMoneyWithoutPrefix } from '../../utils/formatter/currency'
import { Flex, Toast, WhiteSpace } from 'antd-mobile';
import { Icon } from '@iconify/react';
import close from '@iconify/icons-ant-design/close-circle-outlined';

class Home extends React.Component {
  timeoutSearch = undefined;
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: [],
      search_text: '',
      isLoading: true,
      visiblePopup: false,
      visibleConfirm: false,
      visibleAdd: false,
      visibleEdit: false,
      visibleDelete: false
    };
  }

  componentDidMount() {
    this.fetchCovidList()
  }

  async fetchCovidList() {
    const res = await fetch(`https://corona.lmao.ninja/all`);
    let all = await res.json();
    all.country = 'Worldwide'
    const resp = await fetch(`https://corona.lmao.ninja/countries`);
    let countries = await resp.json();
    countries.forEach(country => {
      country.nick = country.countryInfo.iso2
      country.flag = country.countryInfo.flag
      country.lat = country.countryInfo.lat
      country.long = country.countryInfo.long
    });
    let data = [all, ...countries]
    this.setState({ list: data });
  }

  delaySearch = (e) => {
    // let { list, search_text } = this.state
    this.setState({search_text:e.target.value})
    // if(this.timeoutSearch){
    //   clearTimeout(this.timeoutSearch);
    // }
    // this.timeoutSearch = setTimeout(() => {
    //   if(search_text.length > 0) {
    //     let data = list.filter(t => t.country.includes(search_text))
    //     this.setState({ list: data });
    //   }
    // }, 500);
  }

  onChange = (e, fname) => {
    let { form, carform } = this.state
    form[fname] = e.target.value
    carform[fname] = e.target.value
    this.setState({ form, carform })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {

    let { data, list, form, carform, selectedDay, visiblePopup, visibleConfirm, visibleAdd, visibleEdit, visibleDelete } = this.state
    
    const handleTogglePopup = (value, data) => {
      this.setState({ visiblePopup: value, data, form: { registration_no: data.registration_no ? data.registration_no : '', customer: '' } })
    }
    
    const handleToggleConfirm = (value, data) => {
      this.setState({ visibleConfirm: value, data, selectedDay })
    }
    
    const handleToggleAdd = (value) => {
      this.setState({ visibleAdd: value, carform: { registration_no: '', color: '' } })
    }
    const handleToggleEdit = (value, data) => {
      this.setState({ visibleEdit: value, data, carform: { registration_no: data.registration_no ? data.registration_no : '', color: data.color ? data.color : '' } })
    }
    const handleToggleDelete = (value, data) => {
      this.setState({ visibleDelete: value, data, carform: { registration_no: data.registration_no ? data.registration_no : '', color: data.color ? data.color : '' } })
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
                Track the Coronavirus disease (COVID-19) by Rakha Viantoni
              </div>
              <div className="profile" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-menu" onClick={ handleToggleAdd } style={{ paddingRight: 0, marginLeft: 5 }}>
                  {/* <Icon icon={add} color="white" heihgt="30" width="30" /> */}
                </button>
              </div>
            </div>
            <div style={{ marginTop: 30, marginBottom: -20, textAlign: 'center', color: 'white' }}>
              <div className="input-container">
                <input type="text" className="search-field" placeholder="Search" onChange={ e => this.delaySearch(e) } />
              </div>
            </div>
          </div>
          { 
            list = list.filter((data)=>{
              if(this.state.search_text == null)
                  return data
              else if(data.country.toLowerCase().includes(this.state.search_text.toLowerCase())){
                  return data
              }
            }).map((item, key) => 
              <div className="body" key={ key }>
                <div className="action">
                  {/* <Icon icon={editIcon} color="white" heihgt="30" width="30" onClick={ e => handleToggleEdit(true, item) } />
                  <Icon icon={deleteIcon} color="white" heihgt="30" width="30" onClick={ e => handleToggleDelete(true, item) } /> */}
                </div>
                <div className="title">
                  {item.country}&nbsp;<div className="circle" title={item.color} style={{backgroundImage:`url(${item.flag})`}}></div>
                </div>
                <div className="desc">
                Last Updated: {Date(item.updated)}
                </div>
                <Flex>
                  <Flex.Item>
                    <h1 style={{textAlign:'center'}}>Cases</h1>
                    <h2 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.cases)}{item.critical?`(+${numberToMoneyWithoutPrefix(item.todayCases)})`:''}</h2>
                  </Flex.Item>
                  <Flex.Item>
                    <h1 style={{textAlign:'center'}}>Deaths</h1>
                    <h2 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.deaths)}{item.critical?`(+${numberToMoneyWithoutPrefix(item.todayDeaths)})`:''}</h2>
                  </Flex.Item>
                </Flex>
                <Flex>
                  <Flex.Item>
                    <h2 style={{textAlign:'center'}}>Active</h2>
                    <h3 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.active)}</h3>
                  </Flex.Item>
                  <Flex.Item>
                    <h2 style={{textAlign:'center'}}>Recovered</h2>
                    <h3 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.recovered)}</h3>
                  </Flex.Item>
                  <Flex.Item>
                    <h2 style={{textAlign:'center'}}>Critical</h2>
                    <h3 style={{textAlign:'center'}}>{item.critical?numberToMoneyWithoutPrefix(item.critical):'-'}</h3>
                  </Flex.Item>
                </Flex>
                {/* {
                  item.status === 'Free' ?
                  <button className="btn-next" onClick={ e => handleTogglePopup(true, item) }>
                    Reserve
                  </button> :
                    <button className="btn-next" onClick={ e => handleToggleConfirm(true, item) }>
                      Cancel Reservation
                    </button>
                } */}
              </div>
            )
          }
        </section>

        <div className={ visibleConfirm ? "popup active" : "popup" } >
          <div className="content">
            { visibleConfirm && 
            <button className="btn-close" onClick={ e => handleToggleConfirm(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            <div className="title">Cancel reservation by?</div>
            <button className="btn-confirmation" onClick={ e => handleToggleConfirm(false, {}) }>
              No
            </button>
            <button className="btn-confirmation--outline" onClick={ e => this.handleCancel(e) }>
              Yes
            </button>
          </div>
        </div>

        <div className={ visibleDelete ? "popup active" : "popup" } >
          <div className="content">
            { visibleDelete && 
            <button className="btn-close" onClick={ e => handleToggleDelete(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            <div className="title">Delete {data.registration_no}?</div>
            <button className="btn-confirmation" onClick={ e => handleToggleDelete(false, {}) }>
              No
            </button>
            <button className="btn-confirmation--outline" onClick={ e => this.handleDelete(e) }>
              Yes
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);