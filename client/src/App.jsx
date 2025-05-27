import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductDetail from './pages/ProductDetails'
import ProductList from './pages/ProductLists'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<ProductList />} />
				<Route path='/products/:id' element={<ProductDetail />} />
			</Routes>
		</Router>
	)
}

export default App
