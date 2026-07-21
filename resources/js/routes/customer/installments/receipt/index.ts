import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
export const bulk = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bulk.url(options),
    method: 'get',
})

bulk.definition = {
    methods: ["get","head"],
    url: '/installments/receipts/bulk',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
bulk.url = (options?: RouteQueryOptions) => {
    return bulk.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
bulk.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bulk.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
bulk.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bulk.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
    const bulkForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bulk.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
        bulkForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bulk.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::bulk
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:192
 * @route '/installments/receipts/bulk'
 */
        bulkForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bulk.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bulk.form = bulkForm
const receipt = {
    bulk,
}

export default receipt