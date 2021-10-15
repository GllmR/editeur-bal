import React, {useState, useMemo, useCallback, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'

import {getParcelles, getCommuneGeoJson, getNumeros, getVoies, getVoie, getBaseLocale, getToponymes, getNumerosToponyme, getToponyme, certifyBAL} from '../lib/bal-api'

import TokenContext from './token'

const BalDataContext = React.createContext()

export const BalDataContextProvider = React.memo(({balId, codeCommune, idVoie, idToponyme, ...props}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, _setEditingId] = useState()
  const [parcelles, setParcelles] = useState([])
  const [geojson, setGeojson] = useState()
  const [numeros, setNumeros] = useState()
  const [voies, setVoies] = useState()
  const [toponymes, setToponymes] = useState()
  const [voie, setVoie] = useState(null)
  const [toponyme, setToponyme] = useState()
  const [baseLocale, setBaseLocal] = useState(null)

  const {token} = useContext(TokenContext)

  const reloadParcelles = useCallback(async () => {
    if (balId && codeCommune) {
      const parcelles = await getParcelles(balId, codeCommune)
      setParcelles(parcelles)
    } else {
      setParcelles([])
    }
  }, [balId, codeCommune])

  const reloadGeojson = useCallback(async () => {
    if (balId && codeCommune) {
      const geojson = await getCommuneGeoJson(balId, codeCommune)
      setGeojson(geojson)
    } else {
      setGeojson(null)
    }
  }, [balId, codeCommune])

  const reloadVoies = useCallback(async () => {
    if (balId && codeCommune) {
      const voies = await getVoies(balId, codeCommune)
      setVoies(voies)
    } else {
      setVoies(null)
    }
  }, [balId, codeCommune])

  const reloadToponymes = useCallback(async () => {
    if (balId && codeCommune) {
      const toponymes = await getToponymes(balId, codeCommune)
      setToponymes(toponymes)
    } else {
      setToponymes(null)
    }
  }, [balId, codeCommune])

  const reloadNumeros = useCallback(async _idEdited => {
    const id = _idEdited || idVoie

    if (id) {
      const voie = await getVoie(id)
      const numeros = await getNumeros(id, token)
      setVoie(voie)
      setNumeros(numeros)
    } else {
      setVoie(null)
      setNumeros(null)
    }
  }, [idVoie, token])

  const reloadNumerosToponyme = useCallback(async _idEdited => {
    const id = _idEdited || idToponyme

    if (id) {
      const toponyme = await getToponyme(id)
      const numeros = await getNumerosToponyme(id, token)
      setToponyme(toponyme)
      setNumeros(numeros)
    } else {
      setToponyme(null)
      setNumeros(null)
    }
  }, [idToponyme, token])

  const reloadBaseLocale = useCallback(async () => {
    if (balId) {
      const baseLocale = await getBaseLocale(balId)

      setBaseLocal(baseLocale)
    }
  }, [balId])

  const setEditingId = useCallback(editingId => {
    if (token) {
      _setEditingId(editingId)
      setIsEditing(Boolean(editingId))
    }
  }, [token])

  const editingItem = useMemo(() => {
    if (editingId) {
      const voie = voies.find(voie => voie._id === editingId)
      const toponyme = toponymes.find(toponyme => toponyme._id === editingId)
      const numero = numeros && numeros.find(numero => numero._id === editingId)
      return voie || toponyme || numero
    }
  }, [editingId, numeros, voies, toponymes])

  const certifyAllNumeros = async () => {
    await certifyBAL(balId, codeCommune, token, {certifie: true})
    await reloadNumeros()
  }

  useEffect(() => {
    reloadGeojson()
    reloadParcelles()
    reloadVoies()
    reloadToponymes()
  }, [codeCommune, reloadGeojson, reloadParcelles, reloadVoies, reloadToponymes])

  useEffect(() => {
    reloadNumeros()
  }, [idVoie, reloadNumeros])

  useEffect(() => {
    reloadNumerosToponyme()
  }, [idToponyme, reloadNumerosToponyme])

  return (
    <BalDataContext.Provider
      value={{
        isEditing,
        setIsEditing,
        editingId,
        editingItem,
        parcelles,
        geojson,
        reloadGeojson,
        baseLocale,
        codeCommune,
        voie,
        setVoie,
        numeros,
        voies,
        toponymes,
        setEditingId,
        reloadNumeros,
        reloadVoies,
        reloadToponymes,
        reloadBaseLocale,
        reloadNumerosToponyme,
        toponyme,
        certifyAllNumeros
      }}
      {...props}
    />
  )
})

BalDataContextProvider.propTypes = {
  balId: PropTypes.string,
  codeCommune: PropTypes.string,
  idVoie: PropTypes.string,
  idToponyme: PropTypes.string
}

BalDataContextProvider.defaultProps = {
  balId: null,
  codeCommune: null,
  idVoie: null,
  idToponyme: null
}

export default BalDataContext
