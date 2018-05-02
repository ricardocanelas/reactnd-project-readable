import { createSelector } from 'reselect'

const allCategoriesSelector = state => state.categories.all

const getCategories =  createSelector(
    [allCategoriesSelector],
    (categories) => {
        return Object.keys(categories).map(key => categories[key])
    }
)

const getCategoryById = (category_id) => {
    return createSelector(
        [allCategoriesSelector],
        (categories) => {
            return categories ? categories[category_id] : undefined
        }
    )
}

export {
    getCategories,
    getCategoryById
}