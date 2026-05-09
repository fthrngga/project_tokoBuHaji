import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Order\OrderController::store
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
export const store = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::store
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
store.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return store.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::store
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
store.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::store
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
    const storeForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::store
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
        storeForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Features\Order\OrderController::proof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
export const proof = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proof.url(args, options),
    method: 'post',
})

proof.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment/proof',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::proof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
proof.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return proof.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::proof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
proof.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proof.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::proof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
    const proofForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: proof.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::proof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
        proofForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: proof.url(args, options),
            method: 'post',
        })
    
    proof.form = proofForm
/**
* @see \App\Http\Controllers\Features\Order\OrderController::snap
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
export const snap = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snap.url(args, options),
    method: 'post',
})

snap.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment/snap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::snap
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
snap.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return snap.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::snap
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
snap.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: snap.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::snap
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
    const snapForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: snap.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::snap
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
        snapForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: snap.url(args, options),
            method: 'post',
        })
    
    snap.form = snapForm
const payment = {
    store,
proof,
snap,
}

export default payment