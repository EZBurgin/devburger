import * as S from './style'
import { formatPrice } from '../../utils/formatPrice.js'
import { api } from '../../services/api.js'
import { CardProduct } from '../../components/CardProduct/index.jsx'

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function Menu() {

    const navigate = useNavigate()


    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setfilteredProducts] = useState([])

    const { search } = useLocation()

    const queryParams = new URLSearchParams(search)

    const [activeCategory, setActiveCategory] = useState(() => {
        const categoryId = +queryParams.get('categoria')

        if (categoryId) {
            return categoryId
        }
            
        return 0
        

    })

    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get('/categories')

            const newCategories = [{ id: 0, name: 'Todas' }, ...data]

            setCategories(newCategories)
        }

        async function loadProducts() {
            const { data } = await api.get('/products')

            const newProducts = data.map((product) => (
                {
                    currencyValue: formatPrice(product.price), ...product
                }))

            setProducts(newProducts)
        }

        loadCategories();
        loadProducts();

    }, [])

    useEffect(() => {

        if (activeCategory === 0) {
            setfilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(product => {
                return product.category_id === activeCategory
            })

            setfilteredProducts(newFilteredProducts)
        }

    }, [products, activeCategory])

    return (
        <S.Container>
            <S.Banner>
                <h1>
                    O MELHOR <br />
                    HAMBURGUER <br />
                    ESTA AQUI! <br />
                    <span> Este cardápio está irresistível!</span>
                </h1>
            </S.Banner>

            

            <S.CategoryMenu>
                <S.ReturnButton onClick={() => navigate('/')} >Tela Inicial</S.ReturnButton>
                {
                    categories.map((category) => {

                        return <S.CategoryButton
                            $isActiveCategory={category.id === activeCategory}
                            key={category.id}
                            onClick={() => {
                                navigate(
                                    {
                                        pathname: '/cardapio',
                                        search: `?categoria=${category.id}`
                                    },
                                    {
                                        replace: true
                                    },
                                )
                                setActiveCategory(category.id)
                            }}
                        >
                            {category.name}
                        </S.CategoryButton>
                    })
                }
            </S.CategoryMenu>

            <S.ProductsContainer>
                {
                    filteredProducts.map((product) => {
                        return <CardProduct product={product} key={product.id} />
                    })
                }
            </S.ProductsContainer>
        </S.Container>
    )
}