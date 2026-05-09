import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Finance\PaymentCallbackController::handleCallback
 * @see app/Http/Controllers/Features/Finance/PaymentCallbackController.php:21
 * @route '/api/midtrans/callback'
 */
export const handleCallback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleCallback.url(options),
    method: 'post',
})

handleCallback.definition = {
    methods: ["post"],
    url: '/api/midtrans/callback',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Finance\PaymentCallbackController::handleCallback
 * @see app/Http/Controllers/Features/Finance/PaymentCallbackController.php:21
 * @route '/api/midtrans/callback'
 */
handleCallback.url = (options?: RouteQueryOptions) => {
    return handleCallback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Finance\PaymentCallbackController::handleCallback
 * @see app/Http/Controllers/Features/Finance/PaymentCallbackController.php:21
 * @route '/api/midtrans/callback'
 */
handleCallback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handleCallback.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Finance\PaymentCallbackController::handleCallback
 * @see app/Http/Controllers/Features/Finance/PaymentCallbackController.php:21
 * @route '/api/midtrans/callback'
 */
    const handleCallbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: handleCallback.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Finance\PaymentCallbackController::handleCallback
 * @see app/Http/Controllers/Features/Finance/PaymentCallbackController.php:21
 * @route '/api/midtrans/callback'
 */
        handleCallbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: handleCallback.url(options),
            method: 'post',
        })
    
    handleCallback.form = handleCallbackForm
const PaymentCallbackController = { handleCallback }

export default PaymentCallbackController