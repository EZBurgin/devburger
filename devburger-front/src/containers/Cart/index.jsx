import * as S from './style'
import logo from '../../assets/logo.svg'
import { CartItems, CartResume } from '../../components'

export function Cart() {

    return (
        <S.Container>
            <S.Banner>
                <img src={logo}></img>
            </S.Banner>
            <S.Title>Checkout - Pedido</S.Title>
            <S.Content>
                <CartItems/>
                <CartResume/>
            </S.Content>
        </S.Container>
    )
}