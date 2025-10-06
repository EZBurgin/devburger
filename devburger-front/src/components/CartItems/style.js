import styled from 'styled-components'

export const ProductImage = styled.img`
    height: 80px;
    width: 100px;
    border-radius: 16px;
`
export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`
export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        background-color: #9758A6;
        border-radius: 5px;
        width: 32px;
        height: 32px;
        border: none;
        color: #fff;
        font-size: 20px;
        display:flex;
        justify-content:center;
        align-items:center;

        &:hover {
            background-color: #6f457c;
        }
    }
`
export const TrashImg = styled.img`
    width: 27px;
    height: 27px;
    cursor: pointer;
`