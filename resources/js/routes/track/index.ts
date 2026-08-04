import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/track',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TrackOrderController::index
 * @see app/Http/Controllers/TrackOrderController.php:11
 * @route '/track'
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
* @see \App\Http\Controllers\TrackOrderController::search
 * @see app/Http/Controllers/TrackOrderController.php:16
 * @route '/track'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

search.definition = {
    methods: ["post"],
    url: '/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TrackOrderController::search
 * @see app/Http/Controllers/TrackOrderController.php:16
 * @route '/track'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TrackOrderController::search
 * @see app/Http/Controllers/TrackOrderController.php:16
 * @route '/track'
 */
search.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TrackOrderController::search
 * @see app/Http/Controllers/TrackOrderController.php:16
 * @route '/track'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: search.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TrackOrderController::search
 * @see app/Http/Controllers/TrackOrderController.php:16
 * @route '/track'
 */
        searchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: search.url(options),
            method: 'post',
        })
    
    search.form = searchForm
const track = {
    index,
search,
}

export default track