import React, {useState, useCallback} from 'react'
import Router from 'next/router'
import {Pane, Heading, Button, Table, Paragraph} from 'evergreen-ui'

import {addCommune, populateCommune} from '../../lib/bal-api'
import {getCommune} from '../../lib/geo-api'

import useToken from '../../hooks/token'
import useFuse from '../../hooks/fuse'

import TableRow from '../../components/table-row'
import CommuneAdd from '../../components/bal/commune-add'

const Index = React.memo(({baseLocale, defaultCommunes}) => {
  const [communes, setCommunes] = useState(defaultCommunes)
  const [isAdding, setIsAdding] = useState(false)
  const token = useToken(baseLocale._id)

  const [filtered, onFilter] = useFuse(communes, 200, {
    keys: [
      'nom'
    ]
  })

  const onCommuneAdd = useCallback(async ({commune, populate}) => {
    const updated = await addCommune(baseLocale._id, commune, token)

    if (populate) {
      await populateCommune(baseLocale._id, commune, token)
    }

    const updatedCommunes = await Promise.all(
      updated.communes.map(commune => getCommune(commune))
    )

    setIsAdding(false)
    setCommunes(updatedCommunes)
  }, [baseLocale, token])

  const onSelect = useCallback(codeCommune => {
    Router.push(
      `/bal/commune?balId=${baseLocale._id}&codeCommune=${codeCommune}`,
      `/bal/${baseLocale._id}/communes/${codeCommune}`
    )
  }, [baseLocale._id])

  return (
    <>
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor='white'>
        <Pane padding={16} display='flex'>
          <Pane>
            <Heading>{baseLocale.nom}</Heading>
            <Paragraph size={300} margin={0} color='muted'>{baseLocale.description || 'Base Adresse Locale'}</Paragraph>
          </Pane>
          {token && (
            <Pane marginLeft='auto'>
              <Button
                iconBefore='add'
                appearance='primary'
                intent='success'
                disabled={isAdding}
                onClick={() => setIsAdding(true)}
              >
                Ajouter une commune
              </Button>
            </Pane>
          )}
        </Pane>
      </Pane>
      <Pane flex={1} overflowY='scroll'>
        <Table>
          <Table.Head>
            <Table.SearchHeaderCell
              disabled={isAdding}
              placeholder='Rechercher une commune…'
              onChange={onFilter}
            />
          </Table.Head>
          {isAdding && (
            <Table.Row height='auto'>
              <Table.Cell borderBottom display='block' paddingY={12} background='tint1'>
                <CommuneAdd
                  exclude={communes.map(c => c.code)}
                  onSubmit={onCommuneAdd}
                  onCancel={() => setIsAdding(false)}
                />
              </Table.Cell>
            </Table.Row>
          )}
          {filtered.length === 0 && (
            <Table.Row>
              <Table.TextCell color='muted' fontStyle='italic'>
                Aucun résultat
              </Table.TextCell>
            </Table.Row>
          )}
          {filtered.map(commune => (
            <TableRow
              key={commune.code}
              id={commune.code}
              code={commune.code}
              label={commune.nom}
              secondary={
                <>
                  {!commune.voiesCount && 'aucune voie'}
                  {commune.voiesCount === 1 && 'une voie'}
                  {commune.voiesCount > 1 && `${commune.voiesCount} voies`}
                </>
              }
              onSelect={onSelect}
            />
          ))}
        </Table>
      </Pane>
    </>
  )
})

Index.getInitialProps = async ({baseLocale}) => {
  const communes = await Promise.all(
    baseLocale.communes.map(commune => getCommune(commune))
  )

  return {
    layout: 'fullscreen',
    defaultCommunes: communes,
    baseLocale
  }
}

export default Index
