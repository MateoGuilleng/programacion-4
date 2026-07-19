/**
 * Archivo de prueba para handleNestedObject.js
 * 
 * Este archivo contiene pruebas sencillas para verificar que la función
 * handleNestedObject funciona correctamente manteniendo la inmutabilidad.
 */

// Importamos la función (si estamos en Node.js)
let handleNestedObject, deepClone;
if (typeof require !== 'undefined') {
  const module = require('./handleNestedObject.js');
  handleNestedObject = module.handleNestedObject;
  deepClone = module.deepClone;
} else {
  // Si estamos en navegador, asumimos que las funciones están disponibles globalmente
  handleNestedObject = window.handleNestedObject;
  deepClone = window.deepClone;
}

// Objeto de prueba basado en el ejemplo del laboratorio
let userProfile = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Anytown",
    zip: "12345"
  },
  hobbies: ["Reading", "Hiking"],
  social: {
    twitter: "@johndoe",
    facebook: "johndoe123"
  }
};

console.log("=== PRUEBAS DE handleNestedObject ===\n");

// Prueba 1: Actualización de propiedades anidadas (como en el ejemplo del laboratorio)
console.log("Prueba 1: Actualización de propiedades anidadas");
console.log("Objeto original:", JSON.stringify(userProfile, null, 2));

const updatedProfile = handleNestedObject(userProfile, {
  address: { city: "New City" },
  social: { facebook: "updatedFacebook" }
});

console.log("Objeto actualizado:", JSON.stringify(updatedProfile, null, 2));
console.log("¿El objeto original sigue igual?", userProfile.address.city === "Anytown" ? "✓ Sí" : "✗ No");
console.log("¿La propiedad city se actualizó?", updatedProfile.address.city === "New City" ? "✓ Sí" : "✗ No");
console.log("¿La propiedad facebook se actualizó?", updatedProfile.social.facebook === "updatedFacebook" ? "✓ Sí" : "✗ No");
console.log("¿Las propiedades no modificadas se mantienen?", 
  updatedProfile.name === "John Doe" && 
  updatedProfile.address.street === "123 Main St" ? "✓ Sí" : "✗ No");
console.log("");

// Prueba 2: Adición de nuevas propiedades
console.log("Prueba 2: Adición de nuevas propiedades");
const profileWithNewProps = handleNestedObject(userProfile, {
  email: "john.doe@example.com",
  address: { country: "USA" }
});

console.log("Objeto con nuevas propiedades:", JSON.stringify(profileWithNewProps, null, 2));
console.log("¿Se agregó email?", profileWithNewProps.email === "john.doe@example.com" ? "✓ Sí" : "✗ No");
console.log("¿Se agregó country en address?", profileWithNewProps.address.country === "USA" ? "✓ Sí" : "✗ No");
console.log("¿El objeto original no tiene email?", userProfile.email === undefined ? "✓ Sí" : "✗ No");
console.log("");

// Prueba 3: Eliminación de propiedades
console.log("Prueba 3: Eliminación de propiedades");
const profileWithoutSocial = handleNestedObject(userProfile, {
  social: undefined
});

console.log("Objeto sin social:", JSON.stringify(profileWithoutSocial, null, 2));
console.log("¿Se eliminó social?", profileWithoutSocial.social === undefined ? "✓ Sí" : "✗ No");
console.log("¿El objeto original aún tiene social?", userProfile.social !== undefined ? "✓ Sí" : "✗ No");
console.log("");

// Prueba 4: Arrays anidados (los arrays también se manejan inmutables)
console.log("Prueba 4: Arrays anidados");
const profileWithNewHobby = handleNestedObject(userProfile, {
  hobbies: ["Reading", "Hiking", "Swimming"]
});

console.log("Objeto con nuevo hobby:", JSON.stringify(profileWithNewHobby, null, 2));
console.log("¿Se agregó Swimming?", profileWithNewHobby.hobbies.includes("Swimming") ? "✓ Sí" : "✗ No");
console.log("¿El array original no cambió?", 
  userProfile.hobbies.length === 2 && 
  !userProfile.hobbies.includes("Swimming") ? "✓ Sí" : "✗ No");
console.log("¿Los arrays son diferentes objetos?", userProfile.hobbies !== profileWithNewHobby.hobbies ? "✓ Sí" : "✗ No");
console.log("");

// Prueba 5: Objetos muy anidados (múltiples niveles)
console.log("Prueba 5: Objetos muy anidados");
const deeplyNested = {
  level1: {
    level2: {
      level3: {
        level4: {
          value: "deep"
        }
      }
    }
  }
};

const updatedDeeplyNested = handleNestedObject(deeplyNested, {
  level1: { 
    level2: { 
      level3: { 
        level4: { 
          value: "modified",
          newProp: "added" 
        } 
      } 
    } 
  }
});

console.log("Objeto profundamente anidado original:", JSON.stringify(deeplyNested, null, 2));
console.log("Objeto actualizado:", JSON.stringify(updatedDeeplyNested, null, 2));
console.log("¿Se modificó el valor profundo?", updatedDeeplyNested.level1.level2.level3.level4.value === "modified" ? "✓ Sí" : "✗ No");
console.log("¿Se agregó nueva propiedad?", updatedDeeplyNested.level1.level2.level3.level4.newProp === "added" ? "✓ Sí" : "✗ No");
console.log("¿El original no cambió?", deeplyNested.level1.level2.level3.level4.value === "deep" ? "✓ Sí" : "✗ No");
console.log("");

// Prueba 6: Verificación de inmutabilidad estricta
console.log("Prueba 6: Verificación de inmutabilidad estricta");
console.log("¿El objeto original es diferente al actualizado?", userProfile !== updatedProfile ? "✓ Sí" : "✗ No");
console.log("¿El objeto address original es diferente?", userProfile.address !== updatedProfile.address ? "✓ Sí" : "✗ No");
console.log("¿El objeto social original es diferente?", userProfile.social !== updatedProfile.social ? "✓ Sí" : "✗ No");
console.log("¿El objeto hobbies original es diferente?", userProfile.hobbies !== updatedProfile.hobbies ? "✓ Sí" : "✗ No");
console.log("");

console.log("=== TODAS LAS PRUEBAS COMPLETADAS ===");

// Función auxiliar para ejecutar pruebas en navegador
if (typeof window !== 'undefined') {
  window.runTests = function() {
    const consoleDiv = document.getElementById('test-console');
    if (consoleDiv) {
      const originalLog = console.log;
      console.log = function(...args) {
        originalLog.apply(console, args);
        consoleDiv.innerHTML += args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '<br>';
      };
      
      // Ejecutar pruebas
      eval(document.getElementById('test-script').textContent);
      
      console.log = originalLog;
    }
  };
}