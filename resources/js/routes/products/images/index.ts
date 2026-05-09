import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Features\Product\ProductController::destroy
 * @see app/Features/Product/ProductController.php:136
 * @route '/products/images/{image}'
 */
export const destroy = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/products/images/{image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Features\Product\ProductController::destroy
 * @see app/Features/Product/ProductController.php:136
 * @route '/products/images/{image}'
 */
destroy.url = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { image: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { image: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    image: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        image: typeof args.image === 'object'
                ? args.image.id
                : args.image,
                }

    return destroy.definition.url
            .replace('{image}', parsedArgs.image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Product\ProductController::destroy
 * @see app/Features/Product/ProductController.php:136
 * @route '/products/images/{image}'
 */
destroy.delete = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Features\Product\ProductController::destroy
 * @see app/Features/Product/ProductController.php:136
 * @route '/products/images/{image}'
 */
    const destroyForm = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Product\ProductController::destroy
 * @see app/Features/Product/ProductController.php:136
 * @route '/products/images/{image}'
 */
        destroyForm.delete = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const images = {
    destroy,
}

export default images