import PropTypes from 'prop-types'
import {Pane, Heading} from 'evergreen-ui'

import {spaceThousands} from '@/lib/utils/numbers'

function Counter({label, value, color}) {
  return (
    <Pane marginY={16} marginX='auto' textAlign='center'>
      <Heading size={700} color={color}>
        {spaceThousands(value)}
      </Heading>
      <Heading size={500} fontWeight={300} color='muted'>
        {label}
      </Heading>
    </Pane>
  )
}

Counter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string
}

Counter.defaultProps = {
  color: '#222'
}

export default Counter
