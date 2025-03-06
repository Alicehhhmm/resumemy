'use strict'

import Sval from 'sval'

/**
 * Creates a JavaScript Evaluater 用于在沙箱环境中执行JS代码
 * 
 * @param {Record<string, any>} dependencies All sort of dependencies to be passed to the JavaScript context
 * @param {'module' | 'script'} mode The mode of the JavaScript execution
 *
 * @returns {Sval} Returns an Sandboxed instance of a JavaScript interpreter
 */
export const createSval = (dependencies = {}, mode = 'module') => {
    const svalInterpreter = new Sval({
        ecmaVer: 'latest',
        sandBox: true,
        sourceType: mode,
    })

    svalInterpreter.import(dependencies)

    return svalInterpreter
}
