import { CartButton } from '../../components/CartButton/index.jsx'
import * as S from './style'
import { useCart } from '../../hooks/CartContext.jsx'

import PropTypes from 'prop-types'

export function CardProduct({product}) {

    const { putProductInCart } = useCart() 

    return (
        <S.Container>
            <S.CardImage src={product.url} alt={product.name}/>
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
            </div>
            
            <CartButton onClick={() => putProductInCart(product)}></CartButton>
        </S.Container>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object
}