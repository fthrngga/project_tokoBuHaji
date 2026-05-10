import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/addresses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\AddressController::index
 * @see app/Http/Controllers/Settings/AddressController.php:12
 * @route '/settings/addresses'
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
* @see \App\Http\Controllers\Settings\AddressController::store
 * @see app/Http/Controllers/Settings/AddressController.php:19
 * @route '/settings/addresses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/addresses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\AddressController::store
 * @see app/Http/Controllers/Settings/AddressController.php:19
 * @route '/settings/addresses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AddressController::store
 * @see app/Http/Controllers/Settings/AddressController.php:19
 * @route '/settings/addresses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Settings\AddressController::store
 * @see app/Http/Controllers/Settings/AddressController.php:19
 * @route '/settings/addresses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\AddressController::store
 * @see app/Http/Controllers/Settings/AddressController.php:19
 * @route '/settings/addresses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Settings\AddressController::destroy
 * @see app/Http/Controllers/Settings/AddressController.php:44
 * @route '/settings/addresses/{address}'
 */
export const destroy = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/addresses/{address}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\AddressController::destroy
 * @see app/Http/Controllers/Settings/AddressController.php:44
 * @route '/settings/addresses/{address}'
 */
destroy.url = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { address: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { address: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    address: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        address: typeof args.address === 'object'
                ? args.address.id
                : args.address,
                }

    return destroy.definition.url
            .replace('{address}', parsedArgs.address.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AddressController::destroy
 * @see app/Http/Controllers/Settings/AddressController.php:44
 * @route '/settings/addresses/{address}'
 */
destroy.delete = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Settings\AddressController::destroy
 * @see app/Http/Controllers/Settings/AddressController.php:44
 * @route '/settings/addresses/{address}'
 */
    const destroyForm = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\AddressController::destroy
 * @see app/Http/Controllers/Settings/AddressController.php:44
 * @route '/settings/addresses/{address}'
 */
        destroyForm.delete = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Settings\AddressController::setPrimary
 * @see app/Http/Controllers/Settings/AddressController.php:51
 * @route '/settings/addresses/{address}/primary'
 */
export const setPrimary = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setPrimary.url(args, options),
    method: 'patch',
})

setPrimary.definition = {
    methods: ["patch"],
    url: '/settings/addresses/{address}/primary',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\AddressController::setPrimary
 * @see app/Http/Controllers/Settings/AddressController.php:51
 * @route '/settings/addresses/{address}/primary'
 */
setPrimary.url = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { address: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { address: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    address: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        address: typeof args.address === 'object'
                ? args.address.id
                : args.address,
                }

    return setPrimary.definition.url
            .replace('{address}', parsedArgs.address.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\AddressController::setPrimary
 * @see app/Http/Controllers/Settings/AddressController.php:51
 * @route '/settings/addresses/{address}/primary'
 */
setPrimary.patch = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setPrimary.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Settings\AddressController::setPrimary
 * @see app/Http/Controllers/Settings/AddressController.php:51
 * @route '/settings/addresses/{address}/primary'
 */
    const setPrimaryForm = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setPrimary.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\AddressController::setPrimary
 * @see app/Http/Controllers/Settings/AddressController.php:51
 * @route '/settings/addresses/{address}/primary'
 */
        setPrimaryForm.patch = (args: { address: number | { id: number } } | [address: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setPrimary.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    setPrimary.form = setPrimaryForm
const AddressController = { index, store, destroy, setPrimary }

export default AddressController