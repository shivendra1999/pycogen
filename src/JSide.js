import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BuildPanel from "./BuildPanel.js"
import LearnPanel from "./LearnPanel.js"
import CodePanel from "./CodePanel.js";
import TrainPanel from "./TrainPanel.js";
import "./JSide.css"
class JSide extends Component {
  constructor(props) {
    super(props);
    //set state goes here
  }

  render() {
    return (
      <div id="sidebar">
        <div id="settings">
          <Tabs defaultActiveKey="build" id="settings">
            <Tab eventKey="build" title="Build">
              <div>
                <BuildPanel appState={this.props.appState} />
              </div>
            </Tab>
            <Tab eventKey="learn" title="Learn">
              <div>
                <LearnPanel {...this.props} />
              </div>
            </Tab>
            <Tab eventKey="train" title="Train">
              <div>
                <TrainPanel {...this.props} />
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* <button onClick={() => this.props.doSetOpt()}>Hi</button> */}

        <CodePanel appState={this.props.appState}/>
      </div>
    );
  }
}

export default JSide;











