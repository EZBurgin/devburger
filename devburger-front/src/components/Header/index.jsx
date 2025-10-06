import * as S from './style'

import { UserCircleIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { useNavigate, useResolvedPath } from 'react-router-dom'

import { useUser } from '../../hooks/UseContext.jsx'

export function Header() {

    const navigate = useNavigate()

    const { pathname } = useResolvedPath()

    const { logout, userInfo } = useUser()

    function logoutUser() {

        logout()

        navigate('/login')

    }

    return (
        <S.Container>
            <S.Content>
                <S.Navigation>
                    <div>
                        <S.HeaderLink to={'/'} $isActive={pathname === '/'}>
                            Home
                        </S.HeaderLink>
                        <hr />
                        <S.HeaderLink to={'/cardapio'} $isActive={pathname === '/cardapio'}>
                            Cardápio
                        </S.HeaderLink>
                    </div>
                </S.Navigation>
                <S.Options>
                    <S.Profile>
                        <UserCircleIcon color='#fff' size={24} />
                        <div>
                            <p>Olá, <span>{userInfo.name}</span></p>
                            <S.Logout onClick={logoutUser}>Sair</S.Logout>
                        </div>
                        
                    </S.Profile>
                    <S.LinkContainer>
                        <ShoppingCartIcon color='#fff' size={24} />
                        <S.HeaderLink to={'/carrinho'}>Carrinho</S.HeaderLink>

                    </S.LinkContainer>
                </S.Options>
            </S.Content>
        </S.Container>
    )
}