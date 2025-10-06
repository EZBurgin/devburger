import styled from 'styled-components'
import bannerHome from '../../assets/banner-home.svg'
import background from '../../assets/background.svg'

export const Banner = styled.div`
    background: url('${bannerHome}');
    background-size: cover;
    background-position: center;

    height: 480px;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 83px;

        color: #fff;

        position: absolute;
        right: 20%;
        top: 10%;
    }
`
export const Container = styled.section`
    background: linear-gradient(
        rgba(255,255,255, 0.5),
        rgba(255,255,255,0.5)
        ),
    url('${background}');
    background-size: cover;
    padding-top: 50px;
`