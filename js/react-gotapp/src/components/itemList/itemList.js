import React, { Component } from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListGroupItem = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch() {
        this.setState({
            charList: null,
            error: true
        })
    }

    onError(status){
        this.setState({
            charList: null,
            error: true
        })
    }

    //renderItems принимает массив потому что из API нам приходит array
    renderItems(arr) {
        return arr.map((item, i) => {
            const {name} = item;
            var shortid = require('shortid');
            return (
                <ListGroupItem
                    key={shortid.generate()}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                    >
                    {name}
                </ListGroupItem>
            )
        })
    }
    
    render() {

        const {charList, error} = this.state;

        if (error){
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}