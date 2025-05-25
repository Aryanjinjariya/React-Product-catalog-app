import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import './ProductLists.css'

function ProductList() {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productRes, categoryRes] = await Promise.all([
					fetch('https://fakestoreapi.com/products'),
					fetch('https://fakestoreapi.com/products/categories')
				])

				const productsData = await productRes.json()
				const categoriesData = await categoryRes.json()

				setProducts(productsData)
				setFilteredProducts(productsData)
				setCategories(['all', ...categoriesData])
			} catch (error) {
				console.error('Error fetching data', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		let temp = [...products]

		if (search) {
			temp = temp.filter(p =>
				p.title.toLowerCase().includes(search.toLowerCase())
			)
		}

		if (selectedCategory !== 'all') {
			temp = temp.filter(p => p.category === selectedCategory)
		}

		setFilteredProducts(temp)
	}, [search, selectedCategory, products])

	if (loading) return <Loader />

	return (
		<div style={{ padding: '1rem' }}>
			{/* Filters */}
			<div className='filters'>
				<input
					type='text'
					placeholder='Search products...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>

				<select
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value)}
				>
					{categories.map(cat => (
						<option key={cat} value={cat}>
							{cat.toUpperCase()}
						</option>
					))}
				</select>

				<button
					onClick={() => {
						setSearch('')
						setSelectedCategory('all')
					}}
				>
					Reset
				</button>
			</div>

			{/* Product Cards */}
			<div className='grid-container'>
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default ProductList
