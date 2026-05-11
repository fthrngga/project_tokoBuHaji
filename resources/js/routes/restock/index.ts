import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Features\Finance\FinanceController::approve
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
export const approve = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/restock-approval/{restockRequest}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Features\Finance\FinanceController::approve
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
approve.url = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restockRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restockRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restockRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restockRequest: typeof args.restockRequest === 'object'
                ? args.restockRequest.id
                : args.restockRequest,
                }

    return approve.definition.url
            .replace('{restockRequest}', parsedArgs.restockRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::approve
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
approve.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Features\Finance\FinanceController::approve
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
    const approveForm = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::approve
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
        approveForm.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Features\Finance\FinanceController::reject
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
export const reject = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/restock-approval/{restockRequest}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Features\Finance\FinanceController::reject
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
reject.url = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restockRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restockRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restockRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restockRequest: typeof args.restockRequest === 'object'
                ? args.restockRequest.id
                : args.restockRequest,
                }

    return reject.definition.url
            .replace('{restockRequest}', parsedArgs.restockRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::reject
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
reject.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Features\Finance\FinanceController::reject
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
    const rejectForm = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::reject
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
        rejectForm.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reject.form = rejectForm
const restock = {
    approve,
reject,
}

export default restock