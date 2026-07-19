/**
 * handleNestedObject - Función para manipular objetos anidados manteniendo la inmutabilidad
 * 
 * Esta función permite realizar operaciones (actualizar, eliminar, agregar) en objetos anidados
 * sin mutar el objeto original, garantizando que se devuelve un nuevo objeto con los cambios.
 * 

 * 
 * Nota: La función maneja objetos anidados en múltiples niveles utilizando recursividad
 * para crear copias profundas de las partes del objeto que se modifican.
 * Esta función SOLO trabaja con objetos, no admite arrays.
 */

function handleNestedObject(sourceObject, updates) {
  // Validación: sourceObject debe ser un objeto (no array, no null, no primitivo)
  if (sourceObject === null || typeof sourceObject !== 'object' || Array.isArray(sourceObject)) {
    throw new Error('sourceObject debe ser un objeto (no array, no null, no primitivo)');
  }
  
  // Validación: updates debe ser un objeto o undefined
  if (updates !== undefined && (typeof updates !== 'object' || updates === null || Array.isArray(updates))) {
    throw new Error('updates debe ser un objeto o undefined');
  }
  
  // Función interna para crear copia profunda de objetos
  function createDeepCopy(obj) {
    // Si no es objeto o es null, devolvemos el valor directamente
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    // Si es un array, lanzamos error (no admitimos arrays)
    if (Array.isArray(obj)) {
      throw new Error('La función no admite arrays, solo objetos');
    }
    
    // Creamos un nuevo objeto
    const copy = {};
    
    // Copiamos cada propiedad recursivamente
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = createDeepCopy(obj[key]);
      }
    }
    
    return copy;
  }
  
  // Caso base: si no hay updates, devolvemos una copia profunda del objeto original
  if (!updates || Object.keys(updates).length === 0) {
    return createDeepCopy(sourceObject);
  }
  
  // Creamos una copia profunda del objeto original
  const result = createDeepCopy(sourceObject);
  
  // Procesamos cada propiedad en las actualizaciones
  for (const key in updates) {
    if (updates.hasOwnProperty(key)) {
      const updateValue = updates[key];
      
      // Si el valor de actualización es undefined, eliminamos la propiedad
      if (updateValue === undefined) {
        delete result[key];
        continue;
      }
      
      // Si el valor de actualización es un objeto
      if (typeof updateValue === 'object' && updateValue !== null && !Array.isArray(updateValue)) {
        if (result.hasOwnProperty(key) && typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])) {
          // Manejo recursivo para objetos anidados
          result[key] = handleNestedObject(result[key], updateValue);
        } else {
          // Si la propiedad no existe o no es un objeto, simplemente copiamos el valor
          result[key] = createDeepCopy(updateValue);
        }
      } else {
        // Para valores no-objeto (primitivos), simplemente asignamos el valor
        result[key] = updateValue;
      }
    }
  }
  
  return result;
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleNestedObject };
}