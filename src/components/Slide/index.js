import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';
import './style.css';

const StyledThumb = styled.div`
    border: 4px solid white;
    box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.20);
    margin-top: -30px;
    background-color: #d7007f;
    border-radius: 38px;
    cursor: pointer;
    padding: 20px 0px;
    text-align: center;
    width: 220px;
    font-size: 25px;
    font-weight: bold;
    position: relative;
    @media(max-width: 500px) {
        width: 100px;
        font-size: 12.5px;
        padding: 12px 0;
        margin-top: -15px;
        border: 2px solid white;
    }
    &:before{
        content: '';
        display: block;
        position: absolute;
        width: 0px;
        height: 0px;
        top: 28px;
        border: 8px solid transparent;
        border-right: 12px solid white;
        left: 5px;
        @media(max-width: 500px) {
            display: none;
        }
    }
    &:after{
        content: '';
        display: block;
        position: absolute;
        width: 0px;
        height: 0px;
        top: 28px;
        border: 8px solid transparent;
        border-left: 12px solid white;
        right: 5px;
        @media(max-width: 500px) {
            display: none;
        }
    }
    &:hover {
        box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.20);
        background: #be0070;
    }
    &:focus {
        outline: none;
    }
`;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    height: 25px;
    background: ${props => props.index === 2 ? '#f00' : props.index === 1 ? '#ddd' : 'darkgrey'};
    border-radius: 999px;
    @media(max-width: 500px) {
        height: 12.5px;
    }
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const Thumb = (props, state) => 
    <StyledThumb {...props}>{state.value/1000} <span>000</span> Kč
        {
            state.value > 15000 ?
            <div className="tooltip">{state.value/1000} <span>000</span> Kč nabízíme <span style={{color: 'white'}}>od 2. půjčky</span></div>:null
        }
    </StyledThumb>;

export default class CustomizedSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 15000
        };
    }

    minus() {
        let val = this.state.value;
        val -= 1000;
        if(val < 1000) val = 1000;
        this.setState({value: val});
    }

    plus() {
        let val = this.state.value;
        val += 1000;
        if(val > 20000) val = 20000;
        this.setState({value: val});
    }

    updateValue = (newValue) => {
        this.setState({ value: newValue });
    };

    render() {
        
        return (
            <div className="content">
                <div>{this.state.value}</div>
                <div className="slider-content">
                    <div>
                        <button className="slider-btn minus" onClick={() => {this.minus()}} />
                    </div>

                    <ReactSlider
                        value={this.state.value}
                        className="slider"
                        min={1000}
                        max={20000}
                        defaultValue={15000}
                        step={1000}
                        renderTrack={Track}
                        renderThumb={Thumb}
                        onAfterChange={this.updateValue}
                    />
                    
                    <div>
                        <button className="slider-btn plus" onClick={() => {this.plus()}} />
                    </div>
                    
                </div>

                <div className="label-row">
                    <div className="labels">
                        <div className="money-label">
                            od 1 000 Kč
                        </div>
                        <div className="money-label">
                            od 20 000 Kč
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}