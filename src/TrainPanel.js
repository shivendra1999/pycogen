import React, { Component } from "react";
import { Form } from "react-bootstrap";
class TrainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleEpochChange = this.handleEpochChange.bind(this);
        this.handleBatchChange = this.handleBatchChange.bind(this);
    }

    handleEpochChange(event) {
        this.props.appState.doSetEpochs(event.target.value)
    }

    handleBatchChange(event) {
        this.props.appState.doSetBatchSize(event.target.value)
    }

    render() {
        return (
            <div>
                <br />
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Epochs: <i>{this.props.appState.network.epochs}</i></Form.Label>
                        <Form.Control type="range"
                            onChange={this.handleEpochChange}
                            max="500" 
                            value={this.props.appState.network.epochs}
                            />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Batch Size: <i>{this.props.appState.network.batchSize}</i></Form.Label>
                        <Form.Control type="range"
                            onChange={this.handleBatchChange}
                            min="32"
                            max="256"
                            step="32" value={this.props.appState.network.batchSize}
                        />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default TrainPanel;