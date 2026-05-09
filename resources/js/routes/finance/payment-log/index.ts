import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
export const verify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verify.url(args, options),
    method: 'put',
})

verify.definition = {
    methods: ["put"],
    url: '/admin/finance/payment-log/{id}/verify',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
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
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
verify.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verify.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::verify
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
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
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
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
const paymentLog = {
    verify,
}

export default paymentLog