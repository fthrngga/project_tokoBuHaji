import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/defective-products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::index
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:12
 * @route '/admin/defective-products'
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
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
export const update = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/defective-products/{defective_product}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
update.url = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defective_product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    defective_product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defective_product: args.defective_product,
                }

    return update.definition.url
            .replace('{defective_product}', parsedArgs.defective_product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
update.put = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
update.patch = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
    const updateForm = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
        updateForm.put = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::update
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:32
 * @route '/admin/defective-products/{defective_product}'
 */
        updateForm.patch = (args: { defective_product: string | number } | [defective_product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::sellRepossessed
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:57
 * @route '/admin/defective-products/{defectiveProduct}/sell'
 */
export const sellRepossessed = (args: { defectiveProduct: string | number | { id: string | number } } | [defectiveProduct: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sellRepossessed.url(args, options),
    method: 'post',
})

sellRepossessed.definition = {
    methods: ["post"],
    url: '/admin/defective-products/{defectiveProduct}/sell',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::sellRepossessed
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:57
 * @route '/admin/defective-products/{defectiveProduct}/sell'
 */
sellRepossessed.url = (args: { defectiveProduct: string | number | { id: string | number } } | [defectiveProduct: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { defectiveProduct: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { defectiveProduct: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    defectiveProduct: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        defectiveProduct: typeof args.defectiveProduct === 'object'
                ? args.defectiveProduct.id
                : args.defectiveProduct,
                }

    return sellRepossessed.definition.url
            .replace('{defectiveProduct}', parsedArgs.defectiveProduct.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DefectiveProductController::sellRepossessed
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:57
 * @route '/admin/defective-products/{defectiveProduct}/sell'
 */
sellRepossessed.post = (args: { defectiveProduct: string | number | { id: string | number } } | [defectiveProduct: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sellRepossessed.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::sellRepossessed
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:57
 * @route '/admin/defective-products/{defectiveProduct}/sell'
 */
    const sellRepossessedForm = (args: { defectiveProduct: string | number | { id: string | number } } | [defectiveProduct: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sellRepossessed.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DefectiveProductController::sellRepossessed
 * @see app/Http/Controllers/Admin/DefectiveProductController.php:57
 * @route '/admin/defective-products/{defectiveProduct}/sell'
 */
        sellRepossessedForm.post = (args: { defectiveProduct: string | number | { id: string | number } } | [defectiveProduct: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sellRepossessed.url(args, options),
            method: 'post',
        })
    
    sellRepossessed.form = sellRepossessedForm
const DefectiveProductController = { index, update, sellRepossessed }

export default DefectiveProductController