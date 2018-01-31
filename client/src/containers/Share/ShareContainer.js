import React, { Component } from 'react';
import Share from './Share';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectFilter from './../../components/SelectFilter/';
import SelectField from 'material-ui/SelectField/SelectField';
/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {
    state = {
        finished: false,
        stepIndex: 0
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    primary
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { finished, stepIndex } = this.state;

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Add an image</StepLabel>
                        <StepContent>
                            <p>
                                We Live in a visual culture. Upload an image of
                                the item you're sharing
                            </p>
                            <RaisedButton label="Upload Image">
                                <input type="file" />
                            </RaisedButton>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Add a Title and Description</StepLabel>
                        <StepContent>
                            <p>
                                Folks need to know what you're sharing. Give
                                them a clue by adding a title & description.
                            </p>
                            <TextField
                                style={{ marginTop: 0 }}
                                floatingLabelText="Title"
                            />
                            <TextField
                                style={{ marginTop: 0 }}
                                floatingLabelText="Description"
                            />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <SelectFilter />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <a
                            href="#"
                            onClick={event => {
                                event.preventDefault();
                                this.setState({
                                    stepIndex: 0,
                                    finished: false
                                });
                            }}
                        >
                            Click here
                        </a>{' '}
                        to reset the example.
                    </p>
                )}
            </div>
        );
    }
}

export default VerticalLinearStepper;
