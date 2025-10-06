import { SignOutIcon } from "@phosphor-icons/react"

import { NavLinks } from "./navLinks"
import Logo from '../../assets/logo.svg'
import * as S from './style'
import { useUser } from "../../hooks/UseContext"
import { useResolvedPath } from "react-router-dom"

export function SideNavAdmin() {
    const { logout } = useUser()
    const { pathname } = useResolvedPath()
    
    return (
        <S.Container>
            <img src={Logo} alt='Hamburguer-logo-devburger'/>
            <S.NavLinkContainer>
                {
                    NavLinks.map( link => (
                        <S.NavLink 
                        key={link.id}
                        to={link.path}
                        $isActive={pathname === link.path}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </S.NavLink>
                    ))
                }
            </S.NavLinkContainer>
            <S.Footer>
                <S.NavLink to='/login' onClick={logout}>
                    <SignOutIcon />
                    <p>Sair</p>
                </S.NavLink>
            </S.Footer>
        </S.Container>
    )
}