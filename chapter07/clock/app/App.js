import React, { Component } from 'react';
import { render } from 'react-dom';
import Clock from './Clock';
import Perf from 'react-addons-perf';

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = this.getTime();
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState(this.getTime());
    },10);
  }

  getTime(){
    let now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      tenths: parseInt(now.getMilliseconds()/10),
    };
  }

  render(){
    return (
      <div>
        <Clock hours={this.state.hours}
               minutes={this.state.minutes}
               seconds={this.state.seconds}
               tenths={this.state.tenths}
        />
      </div>
    );
  }
}

Perf.start();
render(<App />, document.getElementById("root"));
Perf.stop();
Perf.printInclusive();
Perf.printWasted();

// setTimeout(()=>{
//   Perf.stop();
//   Perf.printWasted();
// },2000)
