import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link  , Redirect} from 'react-router-dom'
import { cartItemsList, removeCartItem } from '../../actions/cart';


const CartScreen = ({ match, location, history }) => {
    const { cartItems } = useSelector((state) => state.CartState);
    console.log(cartItems)
    const userInfo = useSelector((state) => state.AuthState);
    const { user } = userInfo ;
    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    console.log(qty, productId)

    useEffect(() => {
        if (productId) {
            dispatch(cartItemsList(productId, qty))
        }
    }, [dispatch, qty, productId])


    const removeFromCartHandler = (id) => {
        dispatch(removeCartItem(id))
    }

    const checkoutHandler = () => {
        if(user){
            history.push('/shipping')
        }
        else {
            history.push('/login')
        }
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<h1>Cart is Empty</h1>) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}> {item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={e => dispatch(cartItemsList(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}></Button>
                                        <i className='fas fa-trash'></i>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>

                    <ListGroup>
                        <ListGroup.Item>
                            <h2>SubTotal : ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) </h2>
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
