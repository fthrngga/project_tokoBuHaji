import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import terms from './terms'
/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:126
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
export const pelunasanDini = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pelunasanDini.url(args, options),
    method: 'put',
})

pelunasanDini.definition = {
    methods: ["put"],
    url: '/admin/finance/payment/{id}/pelunasan-dini',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:126
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
pelunasanDini.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pelunasanDini.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:126
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
pelunasanDini.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pelunasanDini.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:126
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
    const pelunasanDiniForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pelunasanDini.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:126
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
        pelunasanDiniForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pelunasanDini.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    pelunasanDini.form = pelunasanDiniForm
/**
* @see \App\Features\Finance\FinanceController::tarik
 * @see app/Features/Finance/FinanceController.php:177
 * @route '/admin/finance/payment/{id}/tarik'
 */
export const tarik = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tarik.url(args, options),
    method: 'post',
})

tarik.definition = {
    methods: ["post"],
    url: '/admin/finance/payment/{id}/tarik',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Features\Finance\FinanceController::tarik
 * @see app/Features/Finance/FinanceController.php:177
 * @route '/admin/finance/payment/{id}/tarik'
 */
tarik.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return tarik.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::tarik
 * @see app/Features/Finance/FinanceController.php:177
 * @route '/admin/finance/payment/{id}/tarik'
 */
tarik.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tarik.url(args, options),
    method: 'post',
})

    /**
* @see \App\Features\Finance\FinanceController::tarik
 * @see app/Features/Finance/FinanceController.php:177
 * @route '/admin/finance/payment/{id}/tarik'
 */
    const tarikForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tarik.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::tarik
 * @see app/Features/Finance/FinanceController.php:177
 * @route '/admin/finance/payment/{id}/tarik'
 */
        tarikForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tarik.url(args, options),
            method: 'post',
        })
    
    tarik.form = tarikForm
/**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:269
 * @route '/admin/finance/payment/{id}/verify'
 */
export const verify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verify.url(args, options),
    method: 'put',
})

verify.definition = {
    methods: ["put"],
    url: '/admin/finance/payment/{id}/verify',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:269
 * @route '/admin/finance/payment/{id}/verify'
 */
verify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:269
 * @route '/admin/finance/payment/{id}/verify'
 */
verify.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verify.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:269
 * @route '/admin/finance/payment/{id}/verify'
 */
    const verifyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:269
 * @route '/admin/finance/payment/{id}/verify'
 */
        verifyForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
export const manual = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manual.url(options),
    method: 'get',
})

manual.definition = {
    methods: ["get","head"],
    url: '/admin/finance/installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
manual.url = (options?: RouteQueryOptions) => {
    return manual.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
manual.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manual.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
manual.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manual.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
    const manualForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manual.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
        manualForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manual.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::manual
 * @see app/Features/Finance/FinanceController.php:309
 * @route '/admin/finance/installments'
 */
        manualForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manual.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manual.form = manualForm
/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:397
 * @route '/admin/finance/installments'
 */
export const storeInstallment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeInstallment.url(options),
    method: 'post',
})

storeInstallment.definition = {
    methods: ["post"],
    url: '/admin/finance/installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:397
 * @route '/admin/finance/installments'
 */
storeInstallment.url = (options?: RouteQueryOptions) => {
    return storeInstallment.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:397
 * @route '/admin/finance/installments'
 */
storeInstallment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeInstallment.url(options),
    method: 'post',
})

    /**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:397
 * @route '/admin/finance/installments'
 */
    const storeInstallmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeInstallment.url(options),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:397
 * @route '/admin/finance/installments'
 */
        storeInstallmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeInstallment.url(options),
            method: 'post',
        })
    
    storeInstallment.form = storeInstallmentForm
const payment = {
    terms,
pelunasanDini,
tarik,
verify,
manual,
storeInstallment,
}

export default payment