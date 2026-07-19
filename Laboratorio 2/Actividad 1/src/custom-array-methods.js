// Implementación de métodos personalizados de array
// Versiones personalizadas de métodos de array de JavaScript que demuestran programación funcional

// customMap: Crea un nuevo array aplicando una función a cada elemento
function customMap(array, callback, thisArg) {
    // Validar entradas
    if (!Array.isArray(array)) {
        throw new TypeError('customMap: First argument must be an array');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError('customMap: Second argument must be a function');
    }
    
    // Crear nuevo array para resultados
    const result = [];
    
    // Iterar sobre elementos del array
    for (let i = 0; i < array.length; i++) {
        // Saltar huecos en arrays dispersos
        if (i in array) {
            // Llamar callback con parámetros y contexto apropiados
            let mappedValue;
            if (thisArg !== undefined) {
                mappedValue = callback.call(thisArg, array[i], i, array);
            } else {
                mappedValue = callback(array[i], i, array);
            }
            
            // Añadir resultado al nuevo array
            result[i] = mappedValue;
        } else {
            // Preservar huecos en arrays dispersos
            result[i] = undefined;
        }
    }
    
    return result;
}

// customReduce: Reduce un array a un solo valor usando una función reductora
function customReduce(array, callback, initialValue) {
    // Validar entradas
    if (!Array.isArray(array)) {
        throw new TypeError('customReduce: First argument must be an array');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError('customReduce: Second argument must be a function');
    }
    
    const length = array.length;
    
    // Manejar casos de array vacío
    if (length === 0) {
        if (arguments.length < 3) { // No se proporcionó valor inicial
            throw new TypeError('customReduce: Reduce of empty array with no initial value');
        }
        return initialValue;
    }
    
    let accumulator;
    let startIndex;
    
    // Determinar acumulador inicial e índice de inicio
    if (arguments.length >= 3) { // Se proporcionó valor inicial
        accumulator = initialValue;
        startIndex = 0;
    } else {
        // Usar primer elemento como valor inicial
        let foundValue = false;
        for (let i = 0; i < length; i++) {
            if (i in array) {
                accumulator = array[i];
                startIndex = i + 1;
                foundValue = true;
                break;
            }
        }
        
        if (!foundValue) {
            throw new TypeError('customReduce: Reduce of empty array with no initial value');
        }
    }
    
    // Iterar sobre elementos restantes
    for (let i = startIndex; i < length; i++) {
        if (i in array) {
            accumulator = callback(accumulator, array[i], i, array);
        }
    }
    
    return accumulator;
}

// customFilter: Crea nuevo array con elementos que pasan una función de prueba
function customFilter(array, predicate, thisArg) {
    // Validar entradas
    if (!Array.isArray(array)) {
        throw new TypeError('customFilter: First argument must be an array');
    }
    
    if (typeof predicate !== 'function') {
        throw new TypeError('customFilter: Second argument must be a function');
    }
    
    // Crear nuevo array para resultados
    const result = [];
    
    // Iterar sobre elementos del array
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            // Llamar predicado con parámetros y contexto apropiados
            let shouldInclude;
            if (thisArg !== undefined) {
                shouldInclude = predicate.call(thisArg, array[i], i, array);
            } else {
                shouldInclude = predicate(array[i], i, array);
            }
            
            // Añadir elemento al resultado si predicado retorna verdadero
            if (shouldInclude) {
                result.push(array[i]);
            }
        }
    }
    
    return result;
}

// customForEach: Ejecuta una función para cada elemento del array
function customForEach(array, callback, thisArg) {
    // Validar entradas
    if (!Array.isArray(array)) {
        throw new TypeError('customForEach: First argument must be an array');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError('customForEach: Second argument must be a function');
    }
    
    // Iterar sobre elementos del array
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            // Llamar callback con parámetros y contexto apropiados
            if (thisArg !== undefined) {
                callback.call(thisArg, array[i], i, array);
            } else {
                callback(array[i], i, array);
            }
        }
    }
    
    // Retornar undefined (consistente con Array.prototype.forEach)
    return undefined;
}

module.exports = {
    customMap,
    customReduce,
    customFilter,
    customForEach
};