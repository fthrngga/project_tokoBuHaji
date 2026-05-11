import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
export const creditMonitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: creditMonitoring.url(options),
    method: 'get',
})

creditMonitoring.definition = {
    methods: ["get","head"],
    url: '/admin/finance/credit-monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
creditMonitoring.url = (options?: RouteQueryOptions) => {
    return creditMonitoring.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
creditMonitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: creditMonitoring.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
creditMonitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: creditMonitoring.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
    const creditMonitoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: creditMonitoring.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
        creditMonitoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: creditMonitoring.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::creditMonitoring
 * @see app/Features/Finance/FinanceController.php:10
 * @route '/admin/finance/credit-monitoring'
 */
        creditMonitoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: creditMonitoring.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    creditMonitoring.form = creditMonitoringForm
/**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
export const arrearsMonitoring = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arrearsMonitoring.url(options),
    method: 'get',
})

arrearsMonitoring.definition = {
    methods: ["get","head"],
    url: '/admin/finance/arrears-monitoring',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrearsMonitoring.url = (options?: RouteQueryOptions) => {
    return arrearsMonitoring.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrearsMonitoring.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: arrearsMonitoring.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
arrearsMonitoring.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: arrearsMonitoring.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
    const arrearsMonitoringForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: arrearsMonitoring.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
        arrearsMonitoringForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: arrearsMonitoring.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::arrearsMonitoring
 * @see app/Features/Finance/FinanceController.php:48
 * @route '/admin/finance/arrears-monitoring'
 */
        arrearsMonitoringForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: arrearsMonitoring.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    arrearsMonitoring.form = arrearsMonitoringForm
/**
* @see \App\Features\Finance\FinanceController::updateCreditTerms
 * @see app/Features/Finance/FinanceController.php:85
 * @route '/admin/finance/payment/{id}/terms'
 */
export const updateCreditTerms = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCreditTerms.url(args, options),
    method: 'put',
})

updateCreditTerms.definition = {
    methods: ["put"],
    url: '/admin/finance/payment/{id}/terms',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::updateCreditTerms
 * @see app/Features/Finance/FinanceController.php:85
 * @route '/admin/finance/payment/{id}/terms'
 */
updateCreditTerms.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateCreditTerms.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::updateCreditTerms
 * @see app/Features/Finance/FinanceController.php:85
 * @route '/admin/finance/payment/{id}/terms'
 */
updateCreditTerms.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCreditTerms.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::updateCreditTerms
 * @see app/Features/Finance/FinanceController.php:85
 * @route '/admin/finance/payment/{id}/terms'
 */
    const updateCreditTermsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCreditTerms.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::updateCreditTerms
 * @see app/Features/Finance/FinanceController.php:85
 * @route '/admin/finance/payment/{id}/terms'
 */
        updateCreditTermsForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCreditTerms.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateCreditTerms.form = updateCreditTermsForm
/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:109
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
export const pelunasanDini = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pelunasanDini.url(args, options),
    method: 'put',
})

pelunasanDini.definition = {
    methods: ["put"],
    url: '/admin/finance/payment/{id}/pelunasan-dini',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:109
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
pelunasanDini.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return pelunasanDini.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:109
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
pelunasanDini.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: pelunasanDini.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:109
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
    const pelunasanDiniForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pelunasanDini.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::pelunasanDini
 * @see app/Features/Finance/FinanceController.php:109
 * @route '/admin/finance/payment/{id}/pelunasan-dini'
 */
        pelunasanDiniForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pelunasanDini.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    pelunasanDini.form = pelunasanDiniForm
/**
* @see \App\Features\Finance\FinanceController::verifyCashPayment
 * @see app/Features/Finance/FinanceController.php:218
 * @route '/admin/finance/payment/{id}/verify'
 */
export const verifyCashPayment = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verifyCashPayment.url(args, options),
    method: 'put',
})

verifyCashPayment.definition = {
    methods: ["put"],
    url: '/admin/finance/payment/{id}/verify',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::verifyCashPayment
 * @see app/Features/Finance/FinanceController.php:218
 * @route '/admin/finance/payment/{id}/verify'
 */
verifyCashPayment.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return verifyCashPayment.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::verifyCashPayment
 * @see app/Features/Finance/FinanceController.php:218
 * @route '/admin/finance/payment/{id}/verify'
 */
verifyCashPayment.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verifyCashPayment.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::verifyCashPayment
 * @see app/Features/Finance/FinanceController.php:218
 * @route '/admin/finance/payment/{id}/verify'
 */
    const verifyCashPaymentForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyCashPayment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::verifyCashPayment
 * @see app/Features/Finance/FinanceController.php:218
 * @route '/admin/finance/payment/{id}/verify'
 */
        verifyCashPaymentForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyCashPayment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    verifyCashPayment.form = verifyCashPaymentForm
/**
* @see \App\Features\Finance\FinanceController::verifyPaymentLog
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
export const verifyPaymentLog = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verifyPaymentLog.url(args, options),
    method: 'put',
})

verifyPaymentLog.definition = {
    methods: ["put"],
    url: '/admin/finance/payment-log/{id}/verify',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Features\Finance\FinanceController::verifyPaymentLog
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
verifyPaymentLog.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return verifyPaymentLog.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::verifyPaymentLog
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
verifyPaymentLog.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: verifyPaymentLog.url(args, options),
    method: 'put',
})

    /**
* @see \App\Features\Finance\FinanceController::verifyPaymentLog
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
    const verifyPaymentLogForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyPaymentLog.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::verifyPaymentLog
 * @see app/Features/Finance/FinanceController.php:160
 * @route '/admin/finance/payment-log/{id}/verify'
 */
        verifyPaymentLogForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyPaymentLog.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    verifyPaymentLog.form = verifyPaymentLogForm
/**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
export const installmentPayment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: installmentPayment.url(options),
    method: 'get',
})

installmentPayment.definition = {
    methods: ["get","head"],
    url: '/admin/finance/installments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
installmentPayment.url = (options?: RouteQueryOptions) => {
    return installmentPayment.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
installmentPayment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: installmentPayment.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
installmentPayment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: installmentPayment.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
    const installmentPaymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: installmentPayment.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
        installmentPaymentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: installmentPayment.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::installmentPayment
 * @see app/Features/Finance/FinanceController.php:258
 * @route '/admin/finance/installments'
 */
        installmentPaymentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: installmentPayment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    installmentPayment.form = installmentPaymentForm
/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:316
 * @route '/admin/finance/installments'
 */
export const storeInstallment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeInstallment.url(options),
    method: 'post',
})

storeInstallment.definition = {
    methods: ["post"],
    url: '/admin/finance/installments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:316
 * @route '/admin/finance/installments'
 */
storeInstallment.url = (options?: RouteQueryOptions) => {
    return storeInstallment.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:316
 * @route '/admin/finance/installments'
 */
storeInstallment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeInstallment.url(options),
    method: 'post',
})

    /**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:316
 * @route '/admin/finance/installments'
 */
    const storeInstallmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeInstallment.url(options),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::storeInstallment
 * @see app/Features/Finance/FinanceController.php:316
 * @route '/admin/finance/installments'
 */
        storeInstallmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeInstallment.url(options),
            method: 'post',
        })
    
    storeInstallment.form = storeInstallmentForm
/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
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
 * @see app/Features/Finance/FinanceController.php:363
 * @route '/admin/finance/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
 * @route '/admin/finance/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
 * @route '/admin/finance/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
 * @route '/admin/finance/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
 * @route '/admin/finance/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::reports
 * @see app/Features/Finance/FinanceController.php:363
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
/**
* @see \App\Features\Finance\FinanceController::storeExpense
 * @see app/Features/Finance/FinanceController.php:421
 * @route '/admin/finance/expenses'
 */
export const storeExpense = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeExpense.url(options),
    method: 'post',
})

storeExpense.definition = {
    methods: ["post"],
    url: '/admin/finance/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Features\Finance\FinanceController::storeExpense
 * @see app/Features/Finance/FinanceController.php:421
 * @route '/admin/finance/expenses'
 */
storeExpense.url = (options?: RouteQueryOptions) => {
    return storeExpense.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::storeExpense
 * @see app/Features/Finance/FinanceController.php:421
 * @route '/admin/finance/expenses'
 */
storeExpense.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeExpense.url(options),
    method: 'post',
})

    /**
* @see \App\Features\Finance\FinanceController::storeExpense
 * @see app/Features/Finance/FinanceController.php:421
 * @route '/admin/finance/expenses'
 */
    const storeExpenseForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeExpense.url(options),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::storeExpense
 * @see app/Features/Finance/FinanceController.php:421
 * @route '/admin/finance/expenses'
 */
        storeExpenseForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeExpense.url(options),
            method: 'post',
        })
    
    storeExpense.form = storeExpenseForm
/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
const restockApproval9ae75426f1c9d971e5e5ed3928059bae = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url(options),
    method: 'get',
})

restockApproval9ae75426f1c9d971e5e5ed3928059bae.definition = {
    methods: ["get","head"],
    url: '/admin/finance/restock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
restockApproval9ae75426f1c9d971e5e5ed3928059bae.url = (options?: RouteQueryOptions) => {
    return restockApproval9ae75426f1c9d971e5e5ed3928059bae.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
restockApproval9ae75426f1c9d971e5e5ed3928059bae.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
restockApproval9ae75426f1c9d971e5e5ed3928059bae.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
    const restockApproval9ae75426f1c9d971e5e5ed3928059baeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
        restockApproval9ae75426f1c9d971e5e5ed3928059baeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/admin/finance/restock'
 */
        restockApproval9ae75426f1c9d971e5e5ed3928059baeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restockApproval9ae75426f1c9d971e5e5ed3928059bae.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    restockApproval9ae75426f1c9d971e5e5ed3928059bae.form = restockApproval9ae75426f1c9d971e5e5ed3928059baeForm
    /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
const restockApproval286c49ed9d56bfa4e809c65f53f32d95 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url(options),
    method: 'get',
})

restockApproval286c49ed9d56bfa4e809c65f53f32d95.definition = {
    methods: ["get","head"],
    url: '/restock-approval',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
restockApproval286c49ed9d56bfa4e809c65f53f32d95.url = (options?: RouteQueryOptions) => {
    return restockApproval286c49ed9d56bfa4e809c65f53f32d95.definition.url + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
restockApproval286c49ed9d56bfa4e809c65f53f32d95.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url(options),
    method: 'get',
})
/**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
restockApproval286c49ed9d56bfa4e809c65f53f32d95.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url(options),
    method: 'head',
})

    /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
    const restockApproval286c49ed9d56bfa4e809c65f53f32d95Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url(options),
        method: 'get',
    })

            /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
        restockApproval286c49ed9d56bfa4e809c65f53f32d95Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url(options),
            method: 'get',
        })
            /**
* @see \App\Features\Finance\FinanceController::restockApproval
 * @see app/Features/Finance/FinanceController.php:443
 * @route '/restock-approval'
 */
        restockApproval286c49ed9d56bfa4e809c65f53f32d95Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restockApproval286c49ed9d56bfa4e809c65f53f32d95.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    restockApproval286c49ed9d56bfa4e809c65f53f32d95.form = restockApproval286c49ed9d56bfa4e809c65f53f32d95Form

export const restockApproval = {
    '/admin/finance/restock': restockApproval9ae75426f1c9d971e5e5ed3928059bae,
    '/restock-approval': restockApproval286c49ed9d56bfa4e809c65f53f32d95,
}

/**
* @see \App\Features\Finance\FinanceController::approveRestock
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
export const approveRestock = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveRestock.url(args, options),
    method: 'patch',
})

approveRestock.definition = {
    methods: ["patch"],
    url: '/restock-approval/{restockRequest}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Features\Finance\FinanceController::approveRestock
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
approveRestock.url = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restockRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restockRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restockRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restockRequest: typeof args.restockRequest === 'object'
                ? args.restockRequest.id
                : args.restockRequest,
                }

    return approveRestock.definition.url
            .replace('{restockRequest}', parsedArgs.restockRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::approveRestock
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
approveRestock.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveRestock.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Features\Finance\FinanceController::approveRestock
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
    const approveRestockForm = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approveRestock.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::approveRestock
 * @see app/Features/Finance/FinanceController.php:454
 * @route '/restock-approval/{restockRequest}/approve'
 */
        approveRestockForm.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approveRestock.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approveRestock.form = approveRestockForm
/**
* @see \App\Features\Finance\FinanceController::rejectRestock
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
export const rejectRestock = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: rejectRestock.url(args, options),
    method: 'patch',
})

rejectRestock.definition = {
    methods: ["patch"],
    url: '/restock-approval/{restockRequest}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Features\Finance\FinanceController::rejectRestock
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
rejectRestock.url = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { restockRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { restockRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    restockRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        restockRequest: typeof args.restockRequest === 'object'
                ? args.restockRequest.id
                : args.restockRequest,
                }

    return rejectRestock.definition.url
            .replace('{restockRequest}', parsedArgs.restockRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Features\Finance\FinanceController::rejectRestock
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
rejectRestock.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: rejectRestock.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Features\Finance\FinanceController::rejectRestock
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
    const rejectRestockForm = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectRestock.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Features\Finance\FinanceController::rejectRestock
 * @see app/Features/Finance/FinanceController.php:464
 * @route '/restock-approval/{restockRequest}/reject'
 */
        rejectRestockForm.patch = (args: { restockRequest: number | { id: number } } | [restockRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectRestock.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    rejectRestock.form = rejectRestockForm
const FinanceController = { creditMonitoring, arrearsMonitoring, updateCreditTerms, pelunasanDini, verifyCashPayment, verifyPaymentLog, installmentPayment, storeInstallment, reports, storeExpense, restockApproval, approveRestock, rejectRestock }

export default FinanceController