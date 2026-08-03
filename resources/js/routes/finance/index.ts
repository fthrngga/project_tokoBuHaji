import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import payment from './payment'
import paymentLog from './payment-log'
import expenses from './expenses'
import restock from './restock'
/**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
export const paymentMonitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentMonitoring.url(options),
    method: 'get',
})

paymentMonitoring.definition = {
    methods: ["get","head"],
    url: '/admin/finance/credit-monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
paymentMonitoring.url = (options?: RouteQueryOptions) => {
    return paymentMonitoring.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
paymentMonitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentMonitoring.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
paymentMonitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentMonitoring.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
    const paymentMonitoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paymentMonitoring.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
        paymentMonitoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentMonitoring.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::paymentMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
        paymentMonitoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentMonitoring.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paymentMonitoring.form = paymentMonitoringForm
/**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
export const arrears = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arrears.url(options),
    method: 'get',
})

arrears.definition = {
    methods: ["get","head"],
    url: '/admin/finance/arrears-monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrears.url = (options?: RouteQueryOptions) => {
    return arrears.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrears.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arrears.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrears.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: arrears.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
    const arrearsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: arrears.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
        arrearsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: arrears.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::arrears
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
        arrearsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: arrears.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    arrears.form = arrearsForm
/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admin/finance/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:446
 * @route '/admin/finance/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
const finance = {
    paymentMonitoring,
arrears,
payment,
paymentLog,
reports,
expenses,
restock,
}

export default finance