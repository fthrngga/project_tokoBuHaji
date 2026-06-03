import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/finance/restock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::index
 * @see app/Features/Finance/FinanceController.php:494
 * @route '/admin/finance/restock'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const restock = {
    index,
}

export default restock