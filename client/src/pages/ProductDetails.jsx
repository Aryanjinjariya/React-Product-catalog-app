import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function ProductDetail() {
	const { id } = useParams()
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then(res => res.json())
			.then(data => setProduct(data))
			.catch(err => console.error('Error loading product:', err))
			.finally(() => setLoading(false))
	}, [id])

	if (loading) return <Loader />
	if (!product) return <p>Product not found.</p>

	return (
		<div style={{ padding: '1rem' }}>
			<Link to='/'>← Back to Products</Link>
			<h1>{product.title}</h1>
			<img
				src={product.image}
				alt={product.title}
				style={{ maxWidth: '300px' }}
			/>
			<h2>${product.price}</h2>
			<p>{product.description}</p>
			<strong>{product.category}</strong>
		</div>
	)
}

export default ProductDetail
