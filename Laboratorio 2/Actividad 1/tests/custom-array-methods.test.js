const { customMap, customReduce, customFilter, customForEach } = require('../src/index');

describe('customMap', () => {
    // Test 1: Basic functionality
    test('should map over array and return new array', () => {
        const numbers = [1, 2, 3];
        const double = n => n * 2;
        const result = customMap(numbers, double);
        
        expect(result).toEqual([2, 4, 6]);
        expect(result).not.toBe(numbers); // Should be new array
    });
    
    // Test 2: Immutability - original array should not be modified
    test('should not modify original array', () => {
        const original = [1, 2, 3];
        const originalCopy = [...original];
        const result = customMap(original, n => n * 2);
        
        expect(original).toEqual(originalCopy);
        expect(result).not.toBe(original);
    });
    
    // Test 3: Empty array should return empty array
    test('should return empty array when given empty array', () => {
        const result = customMap([], n => n * 2);
        expect(result).toEqual([]);
    });
    
    // Test 4: Callback receives correct parameters (element, index, array)
    test('should pass element, index, and original array to callback', () => {
        const array = [10, 20, 30];
        const callback = jest.fn((element, index, arr) => element + index);
        customMap(array, callback);
        
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenNthCalledWith(1, 10, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 20, 1, array);
        expect(callback).toHaveBeenNthCalledWith(3, 30, 2, array);
    });
    
    // Test 5: Error handling - non-array input
    test('should throw TypeError when first argument is not an array', () => {
        expect(() => customMap(null, n => n)).toThrow(TypeError);
        expect(() => customMap(undefined, n => n)).toThrow(TypeError);
        expect(() => customMap('string', n => n)).toThrow(TypeError);
        expect(() => customMap(123, n => n)).toThrow(TypeError);
        expect(() => customMap({}, n => n)).toThrow(TypeError);
    });
    
    // Test 6: Error handling - missing callback
    test('should throw TypeError when callback is not a function', () => {
        expect(() => customMap([1, 2, 3], null)).toThrow(TypeError);
        expect(() => customMap([1, 2, 3], undefined)).toThrow(TypeError);
        expect(() => customMap([1, 2, 3], 'not a function')).toThrow(TypeError);
        expect(() => customMap([1, 2, 3], 123)).toThrow(TypeError);
        expect(() => customMap([1, 2, 3], {})).toThrow(TypeError);
    });
    
    // Test 7: thisArg parameter support
    test('should support thisArg parameter for callback context', () => {
        const obj = { multiplier: 3 };
        const numbers = [1, 2, 3];
        
        function multiply(n) {
            return n * this.multiplier;
        }
        
        const result = customMap(numbers, multiply, obj);
        expect(result).toEqual([3, 6, 9]);
    });
    
    // Test 8: Sparse arrays should preserve holes
    test('should handle sparse arrays correctly', () => {
        // Create sparse array
        const sparseArray = [];
        sparseArray[0] = 1;
        sparseArray[2] = 3; // index 1 is empty
        
        const result = customMap(sparseArray, x => x * 2);
        
        expect(result[0]).toBe(2);
        expect(result[1]).toBeUndefined(); // Should preserve the hole
        expect(result[2]).toBe(6);
        expect(result.length).toBe(3);
    });
    
    // Test 9: Arrays with undefined/null values
    test('should handle arrays with undefined and null values', () => {
        const array = [1, undefined, null, 4];
        const result = customMap(array, x => x === null || x === undefined ? 'empty' : x * 2);
        
        expect(result).toEqual([2, 'empty', 'empty', 8]);
    });
    
    // Test 10: Should match native Array.prototype.map behavior (basic equivalence)
    test('should produce same result as native map for simple cases', () => {
        const numbers = [1, 2, 3, 4, 5];
        const double = n => n * 2;
        
        const nativeResult = numbers.map(double);
        const customResult = customMap(numbers, double);
        
        expect(customResult).toEqual(nativeResult);
    });
    
    // Test 11: Should work with array-like objects (but we only support true arrays)
    test('should not work with array-like objects', () => {
        const arrayLike = { 0: 'a', 1: 'b', length: 2 };
        
        expect(() => customMap(arrayLike, x => x)).toThrow(TypeError);
    });
    
    // Test 12: Return type should always be array
    test('should always return an array', () => {
        const result1 = customMap([1, 2, 3], n => n);
        const result2 = customMap([], n => n);
        const result3 = customMap([undefined], n => n);
        
        expect(Array.isArray(result1)).toBe(true);
        expect(Array.isArray(result2)).toBe(true);
        expect(Array.isArray(result3)).toBe(true);
    });
});

describe('customReduce', () => {
    // Test 1: Basic functionality with initial value
    test('should reduce array to single value with initial value', () => {
        const numbers = [1, 2, 3, 4];
        const sum = (acc, curr) => acc + curr;
        const result = customReduce(numbers, sum, 0);
        
        expect(result).toBe(10);
    });
    
    // Test 2: Basic functionality without initial value
    test('should reduce array to single value without initial value', () => {
        const numbers = [1, 2, 3, 4];
        const sum = (acc, curr) => acc + curr;
        const result = customReduce(numbers, sum);
        
        expect(result).toBe(10);
    });
    
    // Test 3: Immutability - original array should not be modified
    test('should not modify original array', () => {
        const original = [1, 2, 3];
        const originalCopy = [...original];
        const result = customReduce(original, (acc, curr) => acc + curr, 0);
        
        expect(original).toEqual(originalCopy);
    });
    
    // Test 4: Empty array with initial value should return initial value
    test('should return initial value when array is empty', () => {
        const result = customReduce([], (acc, curr) => acc + curr, 10);
        expect(result).toBe(10);
    });
    
    // Test 5: Empty array without initial value should throw TypeError
    test('should throw TypeError when array is empty and no initial value', () => {
        expect(() => customReduce([], (acc, curr) => acc + curr)).toThrow(TypeError);
    });
    
    // Test 6: Callback receives correct parameters (accumulator, element, index, array)
    test('should pass accumulator, element, index, and original array to callback', () => {
        const array = [10, 20, 30];
        const callback = jest.fn((acc, element, index, arr) => acc + element);
        customReduce(array, callback, 0);
        
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenNthCalledWith(1, 0, 10, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 10, 20, 1, array);
        expect(callback).toHaveBeenNthCalledWith(3, 30, 30, 2, array);
    });
    
    // Test 7: Error handling - non-array input
    test('should throw TypeError when first argument is not an array', () => {
        expect(() => customReduce(null, (acc, curr) => acc + curr)).toThrow(TypeError);
        expect(() => customReduce('string', (acc, curr) => acc + curr)).toThrow(TypeError);
    });
    
    // Test 8: Error handling - missing callback
    test('should throw TypeError when callback is not a function', () => {
        expect(() => customReduce([1, 2, 3], null)).toThrow(TypeError);
        expect(() => customReduce([1, 2, 3], 'not a function')).toThrow(TypeError);
    });
    
    // Test 9: Should match native Array.prototype.reduce behavior
    test('should produce same result as native reduce for simple cases', () => {
        const numbers = [1, 2, 3, 4];
        const sum = (acc, curr) => acc + curr;
        
        const nativeResult = numbers.reduce(sum, 0);
        const customResult = customReduce(numbers, sum, 0);
        
        expect(customResult).toEqual(nativeResult);
    });
    
    // Test 10: Sparse arrays should work correctly
    test('should handle sparse arrays correctly', () => {
        // Create sparse array
        const sparseArray = [];
        sparseArray[0] = 1;
        sparseArray[2] = 3; // index 1 is empty
        
        const result = customReduce(sparseArray, (acc, curr) => acc + curr, 0);
        expect(result).toBe(4); // 1 + 3
    });
});

describe('customFilter', () => {
    // Test 1: Basic functionality
    test('should filter array based on predicate', () => {
        const numbers = [1, 2, 3, 4, 5, 6];
        const isEven = n => n % 2 === 0;
        const result = customFilter(numbers, isEven);
        
        expect(result).toEqual([2, 4, 6]);
        expect(result).not.toBe(numbers); // Should be new array
    });
    
    // Test 2: Immutability - original array should not be modified
    test('should not modify original array', () => {
        const original = [1, 2, 3, 4, 5];
        const originalCopy = [...original];
        const result = customFilter(original, n => n > 2);
        
        expect(original).toEqual(originalCopy);
        expect(result).not.toBe(original);
    });
    
    // Test 3: Empty array should return empty array
    test('should return empty array when given empty array', () => {
        const result = customFilter([], n => n > 0);
        expect(result).toEqual([]);
    });
    
    // Test 4: All elements filtered out should return empty array
    test('should return empty array when no elements pass predicate', () => {
        const numbers = [1, 2, 3];
        const result = customFilter(numbers, n => n > 10);
        
        expect(result).toEqual([]);
    });
    
    // Test 5: Callback receives correct parameters (element, index, array)
    test('should pass element, index, and original array to predicate', () => {
        const array = [10, 20, 30];
        const predicate = jest.fn((element, index, arr) => element > 15);
        customFilter(array, predicate);
        
        expect(predicate).toHaveBeenCalledTimes(3);
        expect(predicate).toHaveBeenNthCalledWith(1, 10, 0, array);
        expect(predicate).toHaveBeenNthCalledWith(2, 20, 1, array);
        expect(predicate).toHaveBeenNthCalledWith(3, 30, 2, array);
    });
    
    // Test 6: Error handling - non-array input
    test('should throw TypeError when first argument is not an array', () => {
        expect(() => customFilter(null, n => n)).toThrow(TypeError);
        expect(() => customFilter('string', n => n)).toThrow(TypeError);
    });
    
    // Test 7: Error handling - missing callback
    test('should throw TypeError when predicate is not a function', () => {
        expect(() => customFilter([1, 2, 3], null)).toThrow(TypeError);
        expect(() => customFilter([1, 2, 3], 'not a function')).toThrow(TypeError);
    });
    
    // Test 8: thisArg parameter support
    test('should support thisArg parameter for predicate context', () => {
        const obj = { threshold: 3 };
        const numbers = [1, 2, 3, 4, 5];
        
        function aboveThreshold(n) {
            return n > this.threshold;
        }
        
        const result = customFilter(numbers, aboveThreshold, obj);
        expect(result).toEqual([4, 5]);
    });
    
    // Test 9: Should match native Array.prototype.filter behavior
    test('should produce same result as native filter for simple cases', () => {
        const numbers = [1, 2, 3, 4, 5];
        const isEven = n => n % 2 === 0;
        
        const nativeResult = numbers.filter(isEven);
        const customResult = customFilter(numbers, isEven);
        
        expect(customResult).toEqual(nativeResult);
    });
    
    // Test 10: Sparse arrays should preserve only truthy elements
    test('should handle sparse arrays correctly', () => {
        // Create sparse array
        const sparseArray = [];
        sparseArray[0] = 1;
        sparseArray[2] = 3; // index 1 is empty
        sparseArray[4] = 5;
        
        const result = customFilter(sparseArray, n => n > 2);
        
        expect(result).toEqual([3, 5]);
    });
});

describe('customForEach', () => {
    // Test 1: Basic functionality - callback called for each element
    test('should call callback for each element in array', () => {
        const numbers = [1, 2, 3];
        const callback = jest.fn();
        
        customForEach(numbers, callback);
        
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenNthCalledWith(1, 1, 0, numbers);
        expect(callback).toHaveBeenNthCalledWith(2, 2, 1, numbers);
        expect(callback).toHaveBeenNthCalledWith(3, 3, 2, numbers);
    });
    
    // Test 2: Should return undefined
    test('should always return undefined', () => {
        const numbers = [1, 2, 3];
        const result = customForEach(numbers, n => n * 2);
        
        expect(result).toBeUndefined();
    });
    
    // Test 3: Immutability - original array should not be modified by forEach itself
    test('should not modify original array', () => {
        const original = [1, 2, 3];
        const originalCopy = [...original];
        
        customForEach(original, n => n * 2); // Callback doesn't modify array
        
        expect(original).toEqual(originalCopy);
    });
    
    // Test 4: Empty array should not call callback
    test('should not call callback when array is empty', () => {
        const callback = jest.fn();
        customForEach([], callback);
        
        expect(callback).not.toHaveBeenCalled();
    });
    
    // Test 5: Callback can modify external state
    test('callback can have side effects', () => {
        const numbers = [1, 2, 3];
        const doubled = [];
        
        customForEach(numbers, n => {
            doubled.push(n * 2);
        });
        
        expect(doubled).toEqual([2, 4, 6]);
    });
    
    // Test 6: Callback receives correct parameters (element, index, array)
    test('should pass element, index, and original array to callback', () => {
        const array = [10, 20, 30];
        const callback = jest.fn();
        customForEach(array, callback);
        
        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenNthCalledWith(1, 10, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 20, 1, array);
        expect(callback).toHaveBeenNthCalledWith(3, 30, 2, array);
    });
    
    // Test 7: Error handling - non-array input
    test('should throw TypeError when first argument is not an array', () => {
        expect(() => customForEach(null, n => n)).toThrow(TypeError);
        expect(() => customForEach('string', n => n)).toThrow(TypeError);
    });
    
    // Test 8: Error handling - missing callback
    test('should throw TypeError when callback is not a function', () => {
        expect(() => customForEach([1, 2, 3], null)).toThrow(TypeError);
        expect(() => customForEach([1, 2, 3], 'not a function')).toThrow(TypeError);
    });
    
    // Test 9: thisArg parameter support
    test('should support thisArg parameter for callback context', () => {
        const obj = { multiplier: 3 };
        const numbers = [1, 2, 3];
        const results = [];
        
        function multiplyAndStore(n) {
            results.push(n * this.multiplier);
        }
        
        customForEach(numbers, multiplyAndStore, obj);
        
        expect(results).toEqual([3, 6, 9]);
    });
    
    // Test 10: Should handle sparse arrays correctly
    test('should handle sparse arrays correctly', () => {
        // Create sparse array
        const sparseArray = [];
        sparseArray[0] = 1;
        sparseArray[2] = 3; // index 1 is empty
        const callback = jest.fn();
        
        customForEach(sparseArray, callback);
        
        expect(callback).toHaveBeenCalledTimes(2); // Only called for indices 0 and 2
        expect(callback).toHaveBeenNthCalledWith(1, 1, 0, sparseArray);
        expect(callback).toHaveBeenNthCalledWith(2, 3, 2, sparseArray);
    });
});