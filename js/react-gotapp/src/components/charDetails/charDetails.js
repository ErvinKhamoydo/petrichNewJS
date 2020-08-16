import React, { Component } from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    .select-error {
        color: #000;
    }
`;

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {Field}

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    
    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then(this.onCharDetailsLoaded)
            .catch(() => this.onError())
    }

    onError() {
        this.setState({
            char: null,
            error: true
        })
    }


    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return (
                <CharDetailsBlock className="rounded">
                    <span className="select-error">Please select a character</span>
                </CharDetailsBlock>
            ) 
        }

        const {char} = this.state;
        const {name} = char;

        if (this.state.loading) {
            return (
                <CharDetailsBlock className="rounded">
                    <Spinner/>
                </CharDetailsBlock>
            )
        }

        return (
            <CharDetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </CharDetailsBlock>
        );
    }
}