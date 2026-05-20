import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/returns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProductReturnController::index
 * @see app/Http/Controllers/Admin/ProductReturnController.php:12
 * @route '/admin/returns'
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
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
export const update = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/returns/{return}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
update.url = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { return: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { return: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    return: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        return: typeof args.return === 'object'
                ? args.return.id
                : args.return,
                }

    return update.definition.url
            .replace('{return}', parsedArgs.return.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
update.put = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
update.patch = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
    const updateForm = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
        updateForm.put = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ProductReturnController::update
 * @see app/Http/Controllers/Admin/ProductReturnController.php:23
 * @route '/admin/returns/{return}'
 */
        updateForm.patch = (args: { return: number | { id: number } } | [return: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const ProductReturnController = { index, update }

export default ProductReturnController