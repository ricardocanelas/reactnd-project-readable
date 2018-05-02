import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const FilterByCategory = ({categories, selected, onChange}) => {

    const handleChangeCategory = (e, { value }) => {
        onChange(value)
    }

    return (
        <Form>
            <Form.Group grouped>
                <Form.Radio
                        key="all"
                        checked={selected === 'all'}
                        label="All"
                        name="category"
                        type="radio"
                        value="all"
                        onChange={handleChangeCategory}
                    />
                {categories.map(category => (
                    <Form.Radio
                        key={category.id}
                        checked={selected === category.id}
                        label={category.label}
                        name="category"
                        type="radio"
                        value={category.id}
                        onChange={handleChangeCategory}
                    />
                ))}
            </Form.Group>
        </Form>
    )
}

// PropTypes
FilterByCategory.propTypes = {
    categories: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default FilterByCategory