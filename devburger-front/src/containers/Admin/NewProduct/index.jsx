import { yupResolver } from '@hookform/resolvers/yup'
import { ImageIcon } from '@phosphor-icons/react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as S from './style.js'
import { api } from '../../../services/api.js'
import { toast } from 'react-toastify'

const schema = Yup.object({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.bool(),
    file: Yup.mixed().test('required', 'Escolha um arquivo para continuar', value => {
        return value && value.length > 0
    }).test('fileSize', 'Carregue arquivos ayé 5mb', value => {
        return value && value.length > 0 && value[0].size <= 50000
    }).test('type', 'Carregue apenas imagens png ou jpeg', value => {
        return value && value.length > 0 && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
    })
})

export function NewProduct() {

    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

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

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando o Produto',
            error: 'Erro ao adicionar o produto',
            success: 'Produto adicionado com sucesso'
        })

        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000)
    }

    return (
        <S.Container>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.InputGroup>
                    <S.Label>Nome</S.Label>
                    <S.Input type='text' {...register("name")} />
                    <S.ErrorMessage>{errors?.name?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.Label>Preço</S.Label>
                    <S.Input type='number' {...register("price")} />
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
                        render={({ field }) => (
                            <S.Select
                                {...field}
                                options={categories}
                                getOptionLabel={category => category.name}
                                getOptionValue={category => category.id}
                                placeholder='Categorias'
                                menuPortalTarget={document.body}
                            />
                        )} />
                    <S.ErrorMessage>{errors?.category?.message}</S.ErrorMessage>
                </S.InputGroup>

                <S.InputGroup>
                    <S.ContainerCheckbox>
                        <input type="checkbox" {...register('offer')} />
                        <S.Label>Produto em Oferta?</S.Label>
                    </S.ContainerCheckbox>
                </S.InputGroup>

                <S.SubmitButton> Adicionar Produto </S.SubmitButton>
            </S.Form>
        </S.Container>
    )
}