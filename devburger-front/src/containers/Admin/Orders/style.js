import Select from 'react-select'
import styled from 'styled-components'

export const ProductImg = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`

export const SelectStatus = styled(Select)`
    width: 240px;
`
export const Filter = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 28px 0;
`
export const FilterOption = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props => props.$isActiveStatus ? '#9758a6' : '#625e5e')};
    border-bottom: ${(props) => props.$isActiveStatus ? '2px solid #9758a6' : 'none'};
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
`