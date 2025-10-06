import styled from 'styled-components'
import Background from '../../assets/background.svg'

import { Link as ReactLink } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`
export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    max-width: 50%;

    background: url('${Background}');
    background-color: #1e1e1e;

    p {
        color: #fff;
        font-size: 18px;
        font-weight: 700;

        a {
            text-decoration: underline;
        }
    }

    
`
export const Title = styled.h2`
    font-family: "Road Rage", sans-serif;
    color: #fff;
    font-size: 40px;
    text-align: center;

    span {
        font-family: "Road Rage", sans-serif;
        color: #9758A6;
    }
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
`
export const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
   width: 100%;

   label {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
   }

   input {
    width: 100%;
    height: 52px;
    border: none;
    border-radius: 5px;
    padding: 0 16px;
   }

   p {
    font-size: 14px;
    line-height: 80%;
    color: #cf3057;
    font-weight: 600;
    height: 10px;
   }
`
export const Link = styled(ReactLink)`
    text-decoration: none;
    color: #fff;
`