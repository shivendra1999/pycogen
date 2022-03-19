import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { Form } from "react-bootstrap";

class LearnPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 13,
            input: 12,
            value: 0,
            setValue: 0,
            currentOpti: "SGD",
            optimizers: [
                "SGD", "RMSProp", "Adadelta", "Adam"
            ],
            losses: [
                "Mean Squared Error", "Mean Absolute Error", "Hinge", "Binary Crossentropy"
            ],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        // this.setState({ unitSliderValue: event.target.value });
        // this.props.appState.selectedLayer
        if (this.props.appState.loadable) {
            this.props.appState.doSetLearnRate(event.target.value)
        }
    }

    handleClick(event){
        if(this.props.appState.network.learningRateDecay){
            this.props.appState.doSetLearningDecay(false);
        }
        else{
            this.props.appState.doSetLearningDecay(true);
        }
        // alert(this.props.appState.network.learningRateDecay);
    }
    
    render() {
        return (
            <div>
                {/* <button onClick={() => this.props.appState.doSetOptimizer()}>Hi</button> */}
                <br/>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">Optimizer: <i>{this.state.currentOpti}</i></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.optimizers.map(opti => {
                            return(
                                <Dropdown.Item as="button" 
                                onClick={() => {
                                    this.setState({currentOpti: opti});
                                    this.props.appState.doSetOptimizer(opti);
                                }}
                                    >{opti}</Dropdown.Item>
                            )
                        })}                        
                    </Dropdown.Menu>
                </Dropdown>
                <p></p>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">Loss Function: <i>{this.props.appState.network.loss}</i></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.losses.map(loss => {
                            return(
                                <Dropdown.Item as="button" 
                                onClick={() => {
                                    // this.setState({currentOpti: loss});
                                    this.props.appState.doSetLoss(loss);
                                }}
                                    >{loss}</Dropdown.Item>
                            )
                        })}                        
                    </Dropdown.Menu>
                </Dropdown>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Learning rate of the network: {this.props.appState.loadable ? this.props.appState.network.learnRate : ""}</Form.Label>
                        <Form.Control type="range" 
                        onChange={this.handleChange} 
                        max="0.1" 
                        step="0.001"
                        value={this.props.appState.network.learnRate} />
                    </Form.Group>
                </Form>
                <Form>
                    {['checkbox'].map((type) => (
                        <div key={'learning-rate-decay'} className="mb-3">
                        <Form.Check 
                            type={type}
                            id={`learning rate checkbox`}
                            label={`Learning Rate Decay`}
                            onChange={this.handleClick}     
                            // checked={this.props.appState.network.learningRateDecay}                       
                        />
                        </div>
                    ))}
                </Form>
            </div>
        );
    }
}


export default LearnPanel;
