import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Order\OrderController::index
 * @see app/Http/Controllers/Features/Order/OrderController.php:18
 * @route '/orders'
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
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
export const show = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
show.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
show.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
show.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
    const showForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
        showForm.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Features\Order\OrderController::show
 * @see app/Http/Controllers/Features/Order/OrderController.php:29
 * @route '/orders/{order}'
 */
        showForm.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Features\Order\OrderController::storePayment
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
export const storePayment = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePayment.url(args, options),
    method: 'post',
})

storePayment.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::storePayment
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
storePayment.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storePayment.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::storePayment
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
storePayment.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePayment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::storePayment
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
    const storePaymentForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storePayment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::storePayment
 * @see app/Http/Controllers/Features/Order/OrderController.php:40
 * @route '/orders/{order}/payment'
 */
        storePaymentForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storePayment.url(args, options),
            method: 'post',
        })
    
    storePayment.form = storePaymentForm
/**
* @see \App\Http\Controllers\Features\Order\OrderController::uploadProof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
export const uploadProof = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadProof.url(args, options),
    method: 'post',
})

uploadProof.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment/proof',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::uploadProof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
uploadProof.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return uploadProof.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::uploadProof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
uploadProof.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadProof.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::uploadProof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
    const uploadProofForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadProof.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::uploadProof
 * @see app/Http/Controllers/Features/Order/OrderController.php:82
 * @route '/orders/{order}/payment/proof'
 */
        uploadProofForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadProof.url(args, options),
            method: 'post',
        })
    
    uploadProof.form = uploadProofForm
/**
* @see \App\Http\Controllers\Features\Order\OrderController::generateSnapToken
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
export const generateSnapToken = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateSnapToken.url(args, options),
    method: 'post',
})

generateSnapToken.definition = {
    methods: ["post"],
    url: '/orders/{order}/payment/snap',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\OrderController::generateSnapToken
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
generateSnapToken.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return generateSnapToken.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Features\Order\OrderController::generateSnapToken
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
generateSnapToken.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateSnapToken.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\OrderController::generateSnapToken
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
    const generateSnapTokenForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateSnapToken.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\OrderController::generateSnapToken
 * @see app/Http/Controllers/Features/Order/OrderController.php:227
 * @route '/orders/{order}/payment/snap'
 */
        generateSnapTokenForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateSnapToken.url(args, options),
            method: 'post',
        })
    
    generateSnapToken.form = generateSnapTokenForm
const OrderController = { index, show, storePayment, uploadProof, generateSnapToken }

export default OrderController