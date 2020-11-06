import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {groupBy} from 'lodash'

import {colors} from '../../lib/colors'
import {filterByStatus} from '../../lib/bases-locales'

import BarChart from './charts/bar-chart'

const BALCreationChart = ({basesLocales}) => {
  const groupedByMonth = Object.values(groupBy(basesLocales, 'month'))

  const sumByStatus = useCallback(status => {
    const sums = []

    const filteredByStatus = groupedByMonth.map(basesLocales => filterByStatus(basesLocales, status).length)

    if (filteredByStatus.length > 0) {
      const addedBal = filteredByStatus.reduce((totalValue, currentValue) => {
        sums.push(totalValue)
        const sum = totalValue + currentValue
        return sum
      })
      sums.push(addedBal)
    }

    return sums
  }, [groupedByMonth])

  const datasets = [
    {
      label: 'Publiées',
      data: sumByStatus('published'),
      backgroundColor: colors.green
    },
    {
      label: 'Prêtes à être publiées',
      data: sumByStatus('ready-to-publish'),
      backgroundColor: colors.blue
    },
    {
      label: 'Brouillons',
      data: sumByStatus('draft'),
      backgroundColor: colors.neutral
    }
  ]

  const data = {
    labels: groupedByMonth.map(data => data[0].month),
    datasets
  }

  return (
    <BarChart title='Cumul des Bases Adresse Locales' data={data} />
  )
}

BALCreationChart.propTypes = {
  basesLocales: PropTypes.array.isRequired
}

export default BALCreationChart
