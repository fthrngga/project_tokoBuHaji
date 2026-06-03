import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Features\Finance\FinanceController::store
 * @see app/Features/Finance/FinanceController.php:472
 * @route '/admin/finance/expenses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/finance/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Features\Finance\FinanceController::store
 * @see app/Features/Finance/FinanceController.php:472
 * @route '/admin/finance/expenses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::store
 * @see app/Features/Finance/FinanceController.php:472
 * @route '/admin/finance/expenses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Features\Finance\FinanceController::store
 * @see app/Features/Finance/FinanceController.php:472
 * @route '/admin/finance/expenses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::store
 * @see app/Features/Finance/FinanceController.php:472
 * @route '/admin/finance/expenses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const expenses = {
    store,
}

export default expenses