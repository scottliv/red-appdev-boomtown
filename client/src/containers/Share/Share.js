import React, { Component } from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectFilter from './../../components/SelectFilter/';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class ShareForm extends Component {
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
                    disabled={!this.props.imageUploaded}
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
            <div style={{ maxWidth: 480, maxHeight: 400, margin: 'auto' }}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        this.props.handleFunctions.formSubmit(e);
                    }}
                >
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Add an image</StepLabel>
                            <StepContent>
                                <p>
                                    We Live in a visual culture. Upload an image
                                    of the item you are sharing
                                </p>
                                <RaisedButton label="Upload Image">
                                    <input
                                        type="file"
                                        onChange={e => {
                                            this.props.handleFunctions.imageurl(
                                                e
                                            );
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 100,
                                            opacity: 0
                                        }}
                                    />
                                </RaisedButton>
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Add a Title and Description</StepLabel>
                            <StepContent>
                                <p>
                                    Folks need to know what you are sharing.
                                    Give them a clue by adding a title &
                                    description.
                                </p>
                                <TextField
                                    style={{ marginTop: 0 }}
                                    floatingLabelText="Title"
                                    onChange={e =>
                                        this.props.handleFunctions.title(e)
                                    }
                                />
                                <TextField
                                    style={{ marginTop: 0 }}
                                    floatingLabelText="Description"
                                    onChange={e =>
                                        this.props.handleFunctions.description(
                                            e
                                        )
                                    }
                                />
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Select Tags</StepLabel>
                            <StepContent>
                                <SelectFilter />
                                {this.props.tags.length
                                    ? this.renderStepActions(2)
                                    : ''}
                            </StepContent>
                        </Step>
                    </Stepper>
                    {finished && (
                        <RaisedButton label="Submit">
                            <button
                                type="submit"
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.handleFunctions.formSubmit(e);
                                }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 100,
                                    opacity: 0
                                }}
                            />
                        </RaisedButton>
                    )}
                </form>
            </div>
        );
    }
}

export default ShareForm;
