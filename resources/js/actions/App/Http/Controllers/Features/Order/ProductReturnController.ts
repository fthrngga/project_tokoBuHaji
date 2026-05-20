import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Features\Order\ProductReturnController::store
 * @see app/Http/Controllers/Features/Order/ProductReturnController.php:14
 * @route '/orders/{order}/returns'
 */
export const store = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/orders/{order}/returns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Features\Order\ProductReturnController::store
 * @see app/Http/Controllers/Features/Order/ProductReturnController.php:14
 * @route '/orders/{order}/returns'
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
* @see \App\Http\Controllers\Features\Order\ProductReturnController::store
 * @see app/Http/Controllers/Features/Order/ProductReturnController.php:14
 * @route '/orders/{order}/returns'
 */
store.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Features\Order\ProductReturnController::store
 * @see app/Http/Controllers/Features/Order/ProductReturnController.php:14
 * @route '/orders/{order}/returns'
 */
    const storeForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Features\Order\ProductReturnController::store
 * @see app/Http/Controllers/Features/Order/ProductReturnController.php:14
 * @route '/orders/{order}/returns'
 */
        storeForm.post = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ProductReturnController = { store }

export default ProductReturnController