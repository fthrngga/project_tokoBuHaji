import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::index
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:10
 * @route '/installments'
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
const InstallmentController = { index }

export default InstallmentController