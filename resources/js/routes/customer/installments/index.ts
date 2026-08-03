import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import receipt from './receipt'
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
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
export const receipt = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/installments/receipt/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
receipt.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return receipt.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
receipt.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
receipt.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
    const receiptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
        receiptForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::receipt
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:174
 * @route '/installments/receipt/{id}'
 */
        receiptForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
export const certificate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certificate.url(args, options),
    method: 'get',
})

certificate.definition = {
    methods: ["get","head"],
    url: '/installments/certificate/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
certificate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return certificate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
certificate.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certificate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
certificate.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: certificate.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
    const certificateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: certificate.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
        certificateForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: certificate.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Customer\InstallmentController::certificate
 * @see app/Http/Controllers/Features/Customer/InstallmentController.php:238
 * @route '/installments/certificate/{id}'
 */
        certificateForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: certificate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    certificate.form = certificateForm
const installments = {
    index,
receipt,
certificate,
}

export default installments