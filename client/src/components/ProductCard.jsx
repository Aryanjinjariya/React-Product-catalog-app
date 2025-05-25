import { Link } from 'react-router-dom'
import './ProuductCard.css'

function ProductCard({ product }) {
	return (
		<Link to={`/products/${product.id}`} className='product-link'>
			<div className='product-card'>
				<img src={product.image} alt={product.title} />
				<h3>{product.title}</h3>
				<p>${product.price}</p>
				<span>{product.category}</span>
			</div>
		</Link>
	)
}

export default ProductCard
