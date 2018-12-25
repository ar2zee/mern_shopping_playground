import React, {Component} from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

class ShoppingList extends Component {
    state = {
        items: [
            {id: uuid(), name: 'Eggs'},
            {id: uuid(), name: 'Milk'},
            {id: uuid(), name: 'Meat'},
            {id: uuid(), name: 'Water'}
        ]
    }

    render() {
        const {items} = this.state;
        return (
            <Container>
                <Button 
                onClick={() => {
                    const name = prompt('Enter Item')
                    if(name) this.setState({
                        items: [...items, {id: uuid(), name}]
                    })
                }}
                style={{marginBottom: '2rem'}}
                color="dark">Add Item</Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id,name}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={()=> {
                                        this.setState({
                                            items: items.filter(item => item.id !== id)
                                        })}}>&times;</Button>
                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default ShoppingList;