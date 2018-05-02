import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const sortList = {
    'created_at_asc': { label: 'CreatedAt (asc)', field: 'created_at', order: 'asc' },
    'created_at_desc': { label: 'CreatedAt (desc)', field: 'created_at', order: 'desc' },
    'title_asc': { label: 'Title (asc)', field: 'title', order: 'asc' },
    'title_desc': { label: 'Title (desc)', field: 'title', order: 'desc' },
    'vote_score_asc': { label: 'Votes (asc)', field: 'vote_score', order: 'asc' },
    'vote_score_desc': { label: 'Votes (desc)', field: 'vote_score', order: 'desc' },
    'id_asc': { label: 'Id (asc)', field: 'id', order: 'asc' },
    'id_desc': { label: 'Id (desc)', field: 'id', order: 'desc' },
}

const SortBy = ({selected, onChange}) => {

    const handleChangeSort = (e, { value }) => {
        onChange({field: sortList[value].field, order: sortList[value].order})
    }

    const checked = `${selected.field}_${selected.order}`

    return (
        <Form>
            <Form.Group grouped>
                {Object.keys(sortList).map((key, index) => {
                    return (
                        <Form.Radio
                            key={index}
                            checked={key === checked}
                            label={sortList[key].label}
                            name="sort"
                            type="radio"
                            value={key}
                            onChange={handleChangeSort}
                        />
                    )
                })}
            </Form.Group>
        </Form>
    )
}

// PropTypes
SortBy.propTypes = {
    selected: PropTypes.shape({
        field: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }),
    onChange: PropTypes.func.isRequired,
}

export default SortBy