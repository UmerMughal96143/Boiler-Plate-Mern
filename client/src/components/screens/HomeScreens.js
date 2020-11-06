import React , {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Product';
import { getAllProducts } from '../../actions/product';
import {useDispatch , useSelector } from 'react-redux'
import { Spinnerr } from '../Spinner';

const HomeScreens = () => {
    const {products , loading} = useSelector((state) => state.ProductState)
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchAllProducts = async () => {

           await dispatch(getAllProducts())
           console.log('USEEFFECT RENDERS')

        }
        
      fetchAllProducts();
        
    },[dispatch])
  
    console.log('OUTSIDE RENDERING ')
    
    return (
        <div>
            <h2>Products</h2>
                {loading  ? <Spinnerr/> : <Row>
                {products.map(product => (
                    <Col  key={product._id}  sm={12} md={6} lg={4} xl={3} > 
                        <Product product = {product} />
                     </Col>
                ))}
            </Row>}
            
        </div>
    )
}

export default HomeScreens
