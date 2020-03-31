import React from 'react';
import { withRouter } from 'react-router-dom'
import { numberToMoneyWithoutPrefix } from '../../utils/formatter/currency'
import { Flex, Toast } from 'antd-mobile'
import { Icon } from '@iconify/react'
import topArrow from '@iconify/icons-emojione-v1/top-arrow'
import close from '@iconify/icons-ant-design/close-circle-outlined';
import BackToTop from 'react-back-to-top-button'
import Chart from 'react-google-charts'

class Home extends React.Component {
  timeoutSearch = undefined;
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: [],
      lastUpdate: '',
      searchText: '',
      sortText: 'cases',
      isLoading: true,
      isBottom: false,
      visibleDetail: false
    };
  }

  componentDidMount() {
    this.fetchCovidList()
  }

  async fetchCovidList(sort) {
    let { sortText } = this.state
    Toast.loading('Loading...', 1000, null, true)
    const res = await fetch(`https://corona.lmao.ninja/all/`)
    let all = await res.json()
    all.country = 'Worldwide'
    const resp = await fetch(`https://corona.lmao.ninja/countries/?sort=${sort?sort:sortText}`)
    let countries = await resp.json()
    countries.forEach(country => {
      country.nick = country.countryInfo.iso2
      country.flag = country.countryInfo.flag
      country.lat = country.countryInfo.lat
      country.long = country.countryInfo.long
    });
    let data = [all, ...countries]
    this.setState({ list: data, lastUpdate: all.updated })
    Toast.hide()
  }

  searchBy = (e) => {
    this.setState({searchText:e.target.value})
  }

  sortBy = (e) => {
    this.setState({sortText:e.target.value})
    this.fetchCovidList(e.target.value)
  }

  render() {
    let { 
      data, 
      list, 
      lastUpdate ,
      visibleDetail 
    } = this.state
    const handleToggleDetail = (value, data) => {
      this.setState({ visibleDetail: value, data })
    }
    const pieOptions = {
      title: "",
      pieHole: 0.5,
      slices: [
        {
          color: "#FED766"
        },
        {
          color: "#2BB673"
        },
        {
          color: "#FF7900"
        },
        {
          color: "#FF444E"
        }
      ],
      pieSliceTextStyle: {
        color: '233238'
      },
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 0,
        top: 50,
        width: "100%",
        height: "60%"
      }
    }
    return (
      <React.Fragment>
        <section className="section-home">
          <div className="header" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 30 }}>
            <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div className="title">
                Track the Coronavirus disease (COVID-19) by Rakha Viantoni<br/>
                <span className="sub-title">{Date(lastUpdate)}</span>
              </div>
              {/* <div className="profile" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-menu" onClick={ handleToggleAdd } style={{ paddingRight: 0, marginLeft: 5 }}>
                  <Icon icon={add} color="white" heihgt="30" width="30" />
                </button>
              </div> */}
            </div>
            <div style={{ marginTop: 30, marginBottom: -20, textAlign: 'center', color: 'white' }}>
              <div className="input-container">
                <input type="text" className="search-field" placeholder="Search" onChange={ e => this.searchBy(e) } />
                <select className="select-field" onChange={ e => this.sortBy(e) }>
                  <option value="cases">Sort By Cases</option>
                  <option value="todayCases">Sort By Today Cases</option>
                  <option value="deaths">Sort By Deaths</option>
                  <option value="todayDeaths">Sort By Today Deaths</option>
                  <option value="recovered">Sort By Recovered</option>
                  <option value="active">Sort By Active</option>
                  <option value="critical">Sort By Critical</option>
                </select>
              </div>
            </div>
          </div>
          { 
            list.filter(data => 
              this.state.searchText == null || data.country.toLowerCase().includes(this.state.searchText.toLowerCase())
            ).map((item, key) => 
              <div className="body" key={key} 
                onClick={ e => handleToggleDetail(true, item) }
              >
                <div className="action">
                  {/* <Icon icon={editIcon} color="white" heihgt="30" width="30" onClick={ e => handleToggleEdit(true, item) } />
                  <Icon icon={deleteIcon} color="white" heihgt="30" width="30" onClick={ e => handleToggleDelete(true, item) } /> */}
                </div>
                <div className="title">
                  {item.country}&nbsp;<div className="circle" title={item.color} style={{backgroundImage:`url(${item.flag})`}}></div>
                </div>
                {/* <div className="desc">
                Last Updated: {Date(item.updated)}
                </div> */}
                <Flex style={{margin:'-8px'}}>
                  <Flex.Item>
                    <h1 style={{textAlign:'center',marginBottom:'-8px'}}>Cases</h1>
                    <h2 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.cases)}{item.critical?` (+${numberToMoneyWithoutPrefix(item.todayCases)})`:''}</h2>
                  </Flex.Item>
                  <Flex.Item>
                    <h1 style={{textAlign:'center',marginBottom:'-8px'}}>Deaths</h1>
                    <h2 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.deaths)}{item.critical?` (+${numberToMoneyWithoutPrefix(item.todayDeaths)})`:''}</h2>
                  </Flex.Item>
                </Flex>
                <Flex style={{margin:'-10px'}}>
                  <Flex.Item>
                    <h2 style={{textAlign:'center',marginBottom:'-10px'}}>Active</h2>
                    <h3 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.active)}</h3>
                  </Flex.Item>
                  <Flex.Item>
                    <h2 style={{textAlign:'center',marginBottom:'-10px'}}>Recovered</h2>
                    <h3 style={{textAlign:'center'}}>{numberToMoneyWithoutPrefix(item.recovered)}</h3>
                  </Flex.Item>
                  <Flex.Item>
                    <h2 style={{textAlign:'center',marginBottom:'-10px'}}>Critical</h2>
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
          <BackToTop
            showAt={300}
            speed={150}
            easing="easeInOutQuint"
            style={{right:'-25px',bottom:'-25px'}}
          >
            <Icon icon={topArrow} />
          </BackToTop>
        </section>

        {/* <div className={ visibleConfirm ? "popup active" : "popup" } >
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
        </div> */}

        <div className={ visibleDetail ? "popup active" : "popup" } >
          <div className="content">
            { visibleDetail && 
            <button className="btn-close" onClick={ e => handleToggleDetail(false, {}) }>
              <Icon icon={close} color="white" width="30" height="30" />
            </button>
            }
            <div className="title">
              {data.country}&nbsp;<div className="circle" title={data.color} style={{backgroundImage:`url(${data.flag})`}}></div>
            </div>
            <Chart
              chartType="PieChart"
              data={[["Active", "Recovered"], ["Active", data.active], ["Recovered", data.recovered], ["Critical", data.critical], ["Death", data.deaths]]}
              options={pieOptions}
              graph_id="donutchart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
            <div id="labelOverlay">
              <p class="title">{numberToMoneyWithoutPrefix(data.cases)}</p>
              <p class="sub-title">cases</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);