import { BrowserRouter, Route, Routes } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import Container from "react-bootstrap/Container"
import CartScreen from "./screens/CartScreen"
import SigninScreen from "./screens/SigninScreen"
import ShippingAddressScreen from "./screens/ShippingAddressScreen"
import SignupScreen from "./screens/SignupScreen"
import PaymentMethodScreen from "./screens/PaymentMethodScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import OrderHistoryScreen from "./screens/OrderHistoryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SearchScreen from "./screens/SearchScreen"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardScreen from "./screens/DashboardScreen"
import AdminRoute from "./components/AdminRoute"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import MapScreen from "./screens/MapScreen"
import Banner from "./components/Banner"
import MainFooter from "./components/MainFooter"

function App() {
  return (
    <BrowserRouter>
      <Banner />

      <main>
        <Container>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/search' element={<SearchScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/map'
              element={
                <ProtectedRoute>
                  <MapScreen />
                </ProtectedRoute>
              }
            />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route
              path='/order/:id'
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path='/orderhistory'
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='/shipping' element={<ShippingAddressScreen />}></Route>
            <Route path='/payment' element={<PaymentMethodScreen />}></Route>
            {/* Admin Routes */}
            <Route
              path='/admin/dashboard'
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path='/admin/orders'
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path='/admin/users'
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path='/admin/products'
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path='/admin/product/:id'
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path='/admin/user/:id'
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>

            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <MainFooter />
    </BrowserRouter>
  )
}

export default App
