import styled from 'styled-components'
import { Link } from 'react-router-dom'

import banner from '../../assets/banner-menu.svg'
import background from '../../assets/background.svg'

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;

    background: linear-gradient(
        rgba(255,255,255, 0.5),
        rgba(255,255,255,0.5)
        ),
    url('${background}');
`
export const Banner = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    height: 480px;
    width: 100%;
    
    background: url('${banner}') no-repeat;
    background-color: #1f1f1f;
    background-position: center;
    background-size: cover;
    position: relative;

    color: #fff;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        line-height: 60px;

        position: absolute;
        right: 20%;
        top: 30%;
        
        span {
            display: block;
            font-size: 20px;
            font-weight: 400;
        }
    }

`
export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top:50px;
`
export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${(props) => props.$isActiveCategory ? '#9758a6' : '#696969'};
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;        
    line-height: 20px;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'};

    transition: transform 0.3s ease-in-out;
    transform: ${props => props.$isActiveCategory && 'scale(1.1)'};
    

`
export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    justify-content: center;
    max-width: 1280px;
    gap: 60px;
    margin: 50px auto 0;
`               
export const ReturnButton = styled.button`
    font-size: 24px;
    background: transparent;
    color: #9758a6;
    border: none;
    padding-bottom: 5px;
    line-height: 20px;
`