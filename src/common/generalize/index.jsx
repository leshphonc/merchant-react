import React from 'react'
import { WingBlank, WhiteSpace, DatePicker, List, Switch, Calendar } from 'antd-mobile'
import { ListItem, ItemTop, TopContent } from '@/global'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US'

// const nowTimeStamp = Date.now()
// const now = new Date(nowTimeStamp)
// // GMT is not currently observed in the UK. So use UTC now.
// const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000))

// // Make sure that in `time` mode, the maxDate and minDate are within one day.
// let minDate = new Date(nowTimeStamp - 1e7)
// const maxDate = new Date(nowTimeStamp + 1e7)
// // console.log(minDate, maxDate);
// if (minDate.getDate() !== maxDate.getDate()) {
//   // set the minDate to the 0 of maxDate
//   minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
// }
export default props => {
  function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`
    return `${dateStr} ${timeStr}`
  }
  // const CustomChildren = ({ extra, onClick, children }) => (
  //   <div
  //     onClick={onClick}
  //     style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  //   >
  //     {children}
  //     <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  //   </div>
  // )
  const mapList = () =>
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <select>
          <option value="">全部店铺</option>
          {item.lists.map((val, index) => (
            <option key={index}>{val.title}</option>
          ))}
        </select>
        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="Optional"
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">Date</List.Item>
          </DatePicker>
        </List>

        {/* <ListItem key={index}>
          <ItemTop>
            {item.img ? <img src={item.img} alt="" /> : null}
            <TopContent>
              <div className="top-title">{item.scan_totalNum}</div>
              <WhiteSpace />
            </TopContent>
          </ItemTop>
        </ListItem> */}
        <WhiteSpace size="sm" />
      </React.Fragment>
    ))
  return (
    <React.Fragment>
      <WhiteSpace />
      <WingBlank size="sm">{mapList()}</WingBlank>
      <WhiteSpace />
    </React.Fragment>
  )
}
