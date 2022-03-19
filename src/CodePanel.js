import React, { Component } from "react";
import "./CodePanel.css"
import { Form } from "react-bootstrap";

class CodePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentCode: "model = Sequential()",
            kerasCode: new Map(),
            lossDict: new Map(),
            weightDict: new Map(),
        }
        this.state.kerasCode.set("beginModel", "model = Sequential()");
        this.state.kerasCode.set("addLayer", "model.add(Dense(");
        this.state.kerasCode.set("input_dim", "input_dim=");
        this.state.kerasCode.set("compile", "model.compile(");
        this.state.kerasCode.set("losser", "loss=")
        this.state.kerasCode.set("optimizer", "optimizer=");
        this.state.kerasCode.set("metrics", "metrics=[");
        this.state.kerasCode.set("modelfit", "model.fit(x=x_train, y=y_ytrain, epochs=")
        this.state.kerasCode.set("batch", "batch_size=")
        this.state.kerasCode.set("learnRate", "learning_rate=");
        this.state.kerasCode.set("network_end", "))");
        this.state.kerasCode.set("loss", "loss=");
        this.state.kerasCode.set("learningRateDecay", "decay=")
        this.state.kerasCode.set("weightInit", "kernel_initializer=")

        this.state.lossDict.set("Mean Squared Error", "mean_squared_error")
        this.state.lossDict.set("Mean Absolute Error", "mean_absolute_error")
        this.state.lossDict.set("Hinge", "hinge")
        this.state.lossDict.set("Binary Crossentropy", "binary_crossentropy")

        this.state.weightDict.set("zeros", "zeros")
        this.state.weightDict.set("ones", "ones")
        this.state.weightDict.set("normal", "random_normal")
        this.state.weightDict.set("uniform", "random_uniform")
        this.state.weightDict.set("glorot uniform", "glorot_uniform")
        this.state.weightDict.set("he uniform", "he_uniform")
    }

    getActivationCode(layer) {
        return 'activation=' + "'" + layer.activation + "'";
    }


    doGetCode = (network) => {
        return (<p>
            {this.state.kerasCode.get("beginModel")} <br /><br/>
        {network.arrLayers.map(layer => {
            let code = "";
            code += this.state.kerasCode.get("addLayer");
            code += layer.numNodes + ", ";
            if (layer.isFirstLayer === true) {
                code += this.state.kerasCode.get("input_dim") + layer.numNodes + ", ";
            }
            if (layer.activation != null) {
                code += this.getActivationCode(layer);
            }

            if(layer.weightInit != null) {
                code += ", kernel_initializer=" + "'" + this.state.weightDict.get(layer.weightInit) + "'";
            }
            code += this.state.kerasCode.get("network_end");

            return(<div>
                {code}
                </div>)
        })}
        {"opt=" + "optimizers." + network.optimizer + "(lr=" + network.learnRate + ", " + "decay=" + (network.learningRateDecay ? 0.01 : 0) + ", " + "momentum=0.9)"}        
        <br/>
        {this.state.kerasCode.get("compile") + this.state.kerasCode.get("loss") + "'" + this.state.lossDict.get(network.loss) + "'" + ", " +
            this.state.kerasCode.get("optimizer") + "opt)" }
            <br/>
            <br/>
    {this.state.kerasCode.get("modelfit") + network.epochs + ", " + this.state.kerasCode.get("batch") + network.batchSize + this.state.kerasCode.get("network_end")}
        </p>);
    }

    doGetCode_ = (network) => {
        var code = "";
        code += this.state.kerasCode.get("beginModel") + "\n";
        for (let layer of network.arrLayers) {
            code += this.state.kerasCode.get("addLayer");
            code += layer.numNodes + ", ";
            if (layer.isFirstLayer === true) {
                code += this.state.kerasCode.get("input_dim") + layer.numNodes + ", ";
            }
            if (layer.activation != null) {
                code += this.getActivationCode(layer);
            }
            code += this.state.kerasCode.get("network_end") + "\n";
        }

        code += this.state.kerasCode.get("compile") + this.state.kerasCode.get("losser") + "'" + network.loss + "'" + ", " + this.state.kerasCode.get("optimizer") + "'" + network.optimizer +
            "'" + ", " + this.state.kerasCode.get("metrics") + "'" + "accuracy" + "'" + "])" + ", " + this.state.kerasCode.get("learnRate") + network.learnRate + this.state.kerasCode.get("network_end") + "\n";
        code += this.state.kerasCode.get("modelfit") + network.epochs + ", " + this.state.kerasCode.get("batch") + network.batchSize + this.state.kerasCode.get("network_end");
        return code;
    }
    render() {
        return (
            <div>
                <h5 class="center">Generated Code</h5>
                <div class="code">
                    <br />
                    {/* <h1>Code</h1>
                    <p>{this.doGetCode(this.props.appState.network)}</p> */}
                    <p>{this.doGetCode(this.props.appState.network)}</p>
                    {/* <Form id="codebox">
                    <Form.Group controlId="codebox">
                        <Form.Label>Generated Code</Form.Label>
                        
                        <Form.Control as="textarea" rows="3" placeholder="test"/>
                        </Form.Group>
                    </Form> */}

                    {/* <input className="codepanel" type="text" value= {this.doGetCode(this.props.appState.network)}/> */}
                </div>
            </div>

        );
    }
}

export default CodePanel;