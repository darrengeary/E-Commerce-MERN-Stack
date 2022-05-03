import { useEffect, useReducer, useState } from "react"
import axios from "axios"
import logger from "use-reducer-logger"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Product from "../components/Product"
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  })
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" })
      try {
        const result = await axios.get("/api/products")
        dispatch({ type: "FETCH_SUCCESS", payload: result.data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message })
      }

      // setProducts(result.data);
    }
    fetchData()
  }, [])
  return (
    <div>
      {/* <div className='home-background'>
        <div className='home-bg-curve'>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 1920 215'
            preserveAspectRatio='xMinYMin'
          >
            <path
              fill='#FFF'
              d='M-13,24c3.03-0.28,7.53-0.66,13-1c26.45-1.65,46.73-0.59,57,0c76.61,4.41,118,9,118,9
							c70.55,7.83,105.82,11.74,151,19c32.98,5.3,65.87,11.44,179,37c145.79,32.94,138.71,33.5,203,47c85.09,17.87,149.08,31.32,237,40
							c113.11,11.17,203.29,8.29,234,7c16.74-0.7,63.49-4.13,157-11c107.74-7.91,117.84-9.32,153-10c52.52-1.02,97.8,0.79,153,3
							c21.27,0.85,54.96,2.38,96,5c37.55,2.4,68.64,4.91,119,9c30.97,2.52,56.12,4.64,72,6c0,13.33,0,26.67,0,40c-646,0-1292,0-1938,0
							C-10.33,157.33-11.67,90.67-13,24z'
            ></path>
          </svg>
        </div>
      </div> */}

      <Helmet>
        <title>Pop Up Party IE</title>
      </Helmet>

      <h2 className='mt-5'>Featured Products</h2>
      <div className='mt-5 products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}
export default HomeScreen
