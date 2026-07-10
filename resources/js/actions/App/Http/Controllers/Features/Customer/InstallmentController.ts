import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
export const downloadReceipt = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadReceipt.url(args, options),
    method: 'get',
})

downloadReceipt.definition = {
    methods: ["get","head"],
    url: '/installments/receipt/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
downloadReceipt.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return downloadReceipt.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
downloadReceipt.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadReceipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
downloadReceipt.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadReceipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
    const downloadReceiptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadReceipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
        downloadReceiptForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadReceipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::downloadReceipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:159
 * @route '/installments/receipt/{id}'
 */
        downloadReceiptForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadReceipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadReceipt.form = downloadReceiptForm
const InstallmentController = { index, downloadReceipt }

export default InstallmentController