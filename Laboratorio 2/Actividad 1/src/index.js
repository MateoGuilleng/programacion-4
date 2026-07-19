/**
 * Custom Array Methods Module
 * 
 * This module provides custom implementations of JavaScript array methods
 * that demonstrate functional programming principles.
 * 
 * @module custom-array-methods
 */

// Import custom array methods from main module
const { customMap, customReduce, customFilter, customForEach } = require('./custom-array-methods');

// Export the implemented functions
module.exports = {
  customMap,
  customReduce,
  customFilter,
  customForEach
};