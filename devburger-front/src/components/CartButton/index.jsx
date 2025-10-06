import * as S from './style'
import Cart from '../../assets/cart.svg'

export function CartButton({...props}) {

    return  (
        <S.ContainerButton {...props}>
        <img src={Cart} alt='carrinho-de-compras '/>
    </S.ContainerButton>
    )
}