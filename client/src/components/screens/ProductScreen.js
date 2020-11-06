import React, { useEffect  , useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { Row, Image, Col, ListGroup, Card, Button , Form } from "react-bootstrap";
import {useDispatch , useSelector} from 'react-redux';
import {getProductById} from '../../actions/product';
import {Spinnerr} from '../Spinner';





const ProductScreen = ({ match  , history }) => {
  const [qty , setQty] = useState(1);
  const dispatch = useDispatch();
  const {product , pLoading } = useSelector((state) => state.ProductDetailState)

  useEffect(() => {
    const fetchProductById = async () => {

      await dispatch(getProductById(match.params.id))
      console.log('USEEFFECT RENDERS')

   }
   
 fetchProductById();
  } , [dispatch])


  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


  return (
    <>
    
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {pLoading ? <Spinnerr/> : <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock  > 0 ? 'In Stock' : ' Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Qty
                    </Col>
                    <Col>
                    <Form.Control as='select'  value={qty} onChange={e => setQty(e.target.value)}>
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x+1}>
                             {x+1} 
                          </option>
                        ))
                      }
                    </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                  <Button className='btn-block' disabled={product.countInStock ===0 } onClick={addToCartHandler}>
                      Add To Cart
                  </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row> }
      
    </>
  );
};

export default ProductScreen;
