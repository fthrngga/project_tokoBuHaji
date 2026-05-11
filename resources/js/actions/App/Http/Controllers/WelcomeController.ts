import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
const WelcomeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WelcomeController.url(options),
    method: 'get',
})

WelcomeController.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
WelcomeController.url = (options?: RouteQueryOptions) => {
    return WelcomeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
WelcomeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WelcomeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
WelcomeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: WelcomeController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
    const WelcomeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: WelcomeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
        WelcomeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: WelcomeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WelcomeController::__invoke
 * @see app/Http/Controllers/WelcomeController.php:18
 * @route '/'
 */
        WelcomeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: WelcomeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    WelcomeController.form = WelcomeControllerForm
/**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WelcomeController::dashboard
 * @see app/Http/Controllers/WelcomeController.php:66
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
WelcomeController.dashboard = dashboard

export default WelcomeController