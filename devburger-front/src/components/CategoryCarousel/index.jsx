import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api.js'

import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"

import * as S from './style'

export function CategoryCarousel() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories')

            setCategories(data)
            console.log(data)
        }

        loadCategories()
    }, [])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1280, min: 690 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 690, min: 0 },
            items: 2
        }
    };

    const navigate = useNavigate()

    return (
        <S.Container>
            <S.Title>CATEGORIAS</S.Title>

            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisible={false}
                itemClass='carousel-item'
            >
                {categories.map(( category ) => {
                    return <S.ContainerItems key={category.id} imageUrl={category.url}>
                        
                        <S.CategoryButton
                            onClick={() => {
                                navigate({
                                    pathname:'/cardapio',
                                    search: `?categoria=${category.id}`
                                })
                            }}
                        
                        >{category.name}</S.CategoryButton>
                        
                    </S.ContainerItems>
                })}
                
            </Carousel>
        </S.Container>
    )
}