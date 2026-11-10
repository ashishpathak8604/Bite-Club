import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

const Menu = lazy(() => import('./pages/Menu'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Gallery = lazy(() => import('./pages/Gallery'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Payment = lazy(() => import('./pages/Payment'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const Reservation = lazy(() => import('./pages/Reservation'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="privacy" element={<Legal type="privacy" />} />
          <Route path="terms" element={<Legal type="terms" />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </MotionConfig>
  )
}
