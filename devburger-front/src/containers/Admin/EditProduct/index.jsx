import { yupResolver } from '@hookform/resolvers/yup'
import { ImageIcon } from '@phosphor-icons/react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import * as S from './style.js'
import { api } from '../../../services/api.js'
import { toast } from 'react-toastify'

const schema = Yup.object({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.bool(),
   
})

export function EditProduct() {

    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()
    const { state: { product } } = useLocation()

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories')

            setCategories(data)
        }

        loadCategories()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data) => {
        const productFormData = new FormData()

        productFormData.append('name', data.name)
        productFormData.append('price', data.price * 100)
        productFormData.append('category_id', data.category.id)
        productFormData.append('file', data.file[0])
        productFormData.append('offer', data.offer)

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando o Produto...',
            error: 'Erro ao editar o produto',
            success: 'Produto editado com sucesso'
        })

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000 )
    }

    return (
        <S.Container>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.InputGroup>
                    <S.Label>Nome</S.Label>
                    <S.Input type='text' {...register("name")} defaultValue={product.name} />
                    <S.ErrorMessage>{errors?.name?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label>Preço</S.Label>
                    <S.Input type='number' {...register("price")} defaultValue={product.price / 100} />
                    <S.ErrorMessage>{errors?.price?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.LabelUpload>
                        <ImageIcon />
                        <input
                            type="file"
                            {...register("file")}
                            accept='image/png, image/jpeg'
                            onChange={(value) => {

                                setFileName(value.target.files[0]?.name)
                                register('file').onChange(value)
                            }}
                        />
                        {fileName || 'Upload do Produto'}
                    </S.LabelUpload>
                    <S.ErrorMessage>{errors?.file?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label>Categoria</S.Label>
                    <Controller
                        name='category'
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => (
                            <S.Select
                                {...field}
                                options={categories}
                                getOptionLabel={category => category.name}
                                getOptionValue={category => category.id}
                                placeholder='Categorias'
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )} />
                    <S.ErrorMessage>{errors?.category?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.ContainerCheckbox> 
                        <input type="checkbox" defaultChecked={product.offer} {...register('offer')}/>
                        <S.Label>Produto em Oferta?</S.Label>
                    </S.ContainerCheckbox>
                </S.InputGroup>

                <S.SubmitButton> Editar Produto </S.SubmitButton>
            </S.Form>
        </S.Container>
    )
}