import { CategoryCarousel, OffersCarousel } from '../../components'

import * as S from './styles.js'


export function Home() {
    
    return (
        <main>
            <S.Banner> 
                <h1>Bem-Vindo!</h1>
            </S.Banner>
            <S.Container>
                <div>
                    <CategoryCarousel/>
                    <OffersCarousel/>
                </div>
            </S.Container>
        </main>
    )
}