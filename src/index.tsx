import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import { Popover, Button } from 'antd';
// import './index.css'
import { DateRange } from "react-date-range-thaiyear-custom";
import "react-date-range-thaiyear-custom/dist/styles.css"; // main style file
import "react-date-range-thaiyear-custom/dist/theme/default.css";
declare let require: any;
type State = { dateRange: any; textShowDate: string; styleCalendar: string ,visible: boolean};
import { Moment } from "moment";
import moment = require("moment");
import "moment/locale/th";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class App extends Component<{}, State>  {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      textShowDate: "",
      styleCalendar: "calendar-hide",
    };
  }
  public handleSelect = (date) => {
		console.log(date); // native Date object
  }
  public handleClickYear = value => {
    var start = moment(value)
      .startOf("year")
      .toDate();
    var end = moment(value)
      .endOf("year")
      .toDate();
    this.setState(
      {
        dateRange: {
          selection: {
            startDate: start,
            endDate: end,
            key: "selection"
          }
        }
      }
    );
  };
  public handleClickMonth = value => {
    var start = moment(value)
      .startOf("month")
      .toDate();
    var end = moment(value)
      .endOf("month")
      .toDate();
    this.setState(
      {
        dateRange: {
          selection: {
            startDate: start,
            endDate: end,
            key: "selection"
          }
        }
      }
    );
  };
  public handleRangeChange = (which, payload) => {
    this.setState(
      {
        dateRange: {
          selection: {
            startDate: payload.selection.startDate,
            endDate: payload.selection.endDate,
            key: "selection"
          }
        }
      }
          );
  };
  public onCalendar = () => {
    if (this.state.styleCalendar == "calendar-hide") {
      this.setState({ styleCalendar: "fadeInDown" });
    } else {
      this.setState({ styleCalendar: "calendar-hide" });
    }
  };
  private hide = () => {
    this.setState({visible: false})
  }
  private handleVisibleChange = visible => {
    this.setState({visible})
  }
  
  render() {
    const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
    }
    const content = (
      <DateRange
      onClickCurrentYear={this.handleClickYear}
      onClickCurrentMonth={this.handleClickMonth}
      onChange={this.handleRangeChange.bind(this, "dateRange")}
      moveRangeOnFirstSelection={false}
      ranges={[this.state.dateRange.selection]}
    />
    );
    return ( <Popover content={content} trigger="click">
    <Button>Click me</Button>
  </Popover>)
  }
}

render(<App />, document.getElementById('root'))