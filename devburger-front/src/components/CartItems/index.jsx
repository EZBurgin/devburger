import * as S from './style'
import { Table } from '../index'
import { useCart } from '../../hooks/CartContext'
import { formatPrice } from '../../utils/formatPrice'
import trashIcon from '../../assets/trash.svg'

export function CartItems() {

    const { cartProducts, increaseProduct, decreseProduct, deleteProduct } = useCart()

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Tbody>
                {cartProducts?.length ? (
                    cartProducts.map(product => (
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <S.ProductImage src={product.url} />
                            </Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{product.currencyValue}</Table.Td>
                            <Table.Td>
                                <S.ButtonGroup>
                                    <button onClick={() => decreseProduct(product.id)}> - </button>
                                    {product.quantity}
                                    <button onClick={() => increaseProduct(product.id)}> + </button>
                                </S.ButtonGroup>

                            </Table.Td>
                            <Table.Td>
                                <p style={{fontWeight: 'bold'}}>
                                {formatPrice(product.quantity * product.price)}
                                </p>
                            </Table.Td>
                            <Table.Td>
                                <S.TrashImg src={trashIcon} alt='lixeira' onClick={() => deleteProduct(product.id)} />
                            </Table.Td>

                        </Table.Tr>
                    ))
                ) : (<S.EmptyCart>carinho vazio</S.EmptyCart>)
                }
            </Table.Tbody>
        </Table.Root>
    )
}