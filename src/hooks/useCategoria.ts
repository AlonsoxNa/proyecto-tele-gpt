import CategoriaService from '@/services/CategoriaService'
import React, { useEffect, useState } from 'react'

const useCategoria = () => {
    const [categorias,setCategorias] = useState([])

    const obtenerCategorias = async () => {
        const response = await CategoriaService.obtenerCategorias()
        setCategorias(response)
    }

    return {
        obtenerCategorias,categorias
    }
}

export default useCategoria
