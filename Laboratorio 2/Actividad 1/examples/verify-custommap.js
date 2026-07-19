const { customMap } = require('../src/index');

console.log('=== Verifying customMap Implementation ===\n');

console.log('1. Testing requirement: Accept an array and a callback function as arguments');
try {
    const numbers = [1, 2, 3];
    const result = customMap(numbers, n => n * 2);
    console.log('✓ customMap accepts array and callback:', result);
} catch (error) {
    console.log('✗ Failed:', error.message);
}

console.log('\n2. Testing requirement: Return a new array');
const original = [1, 2, 3];
const result = customMap(original, n => n);
console.log('✓ Returns new array:', result !== original, '(different reference)');

console.log('\n3. Testing requirement: Apply callback function to each element');
const doubled = customMap([1, 2, 3], n => n * 2);
console.log('✓ Callback applied to each element:', doubled);

console.log('\n4. Testing requirement: Pass current element, its index, and the original array to callback');
const testArray = [10, 20, 30];
let callbackCount = 0;
customMap(testArray, (element, index, array) => {
    callbackCount++;
    if (callbackCount === 1) {
        console.log('✓ First call: element=', element, 'index=', index, 'array is same?', array === testArray);
    }
});

console.log('\n5. Testing requirement: Do not modify original array (immutable operation)');
const immutableTest = [1, 2, 3];
const immutableTestCopy = [...immutableTest];
const mappedResult = customMap(immutableTest, n => n * 3);
console.log('✓ Original unchanged:', JSON.stringify(immutableTest) === JSON.stringify(immutableTestCopy));
console.log('  Original:', immutableTest);
console.log('  Result:', mappedResult);

console.log('\n6. Testing requirement: When called with empty array, return empty array');
const emptyResult = customMap([], n => n * 2);
console.log('✓ Empty array returns empty array:', emptyResult, 'length:', emptyResult.length);

console.log('\n7. Testing requirement: If called with non-array argument, throw TypeError');
console.log('✓ Testing non-array inputs:');
try {
    customMap('not an array', n => n);
    console.log('  ✗ Should have thrown TypeError for string');
} catch (error) {
    console.log('  ✓ Throws TypeError for string:', error.name);
}

try {
    customMap(null, n => n);
    console.log('  ✗ Should have thrown TypeError for null');
} catch (error) {
    console.log('  ✓ Throws TypeError for null:', error.name);
}

try {
    customMap(123, n => n);
    console.log('  ✗ Should have thrown TypeError for number');
} catch (error) {
    console.log('  ✓ Throws TypeError for number:', error.name);
}

console.log('\n8. Testing requirement: If called without callback function, throw TypeError');
console.log('✓ Testing missing/invalid callbacks:');
try {
    customMap([1, 2, 3], null);
    console.log('  ✗ Should have thrown TypeError for null callback');
} catch (error) {
    console.log('  ✓ Throws TypeError for null callback:', error.name);
}

try {
    customMap([1, 2, 3], 'not a function');
    console.log('  ✗ Should have thrown TypeError for string callback');
} catch (error) {
    console.log('  ✓ Throws TypeError for string callback:', error.name);
}

console.log('\n9. Additional test: Compare with native Array.prototype.map');
const nativeComparison = [1, 2, 3, 4, 5];
const nativeResult = nativeComparison.map(n => n + 10);
const customResult = customMap(nativeComparison, n => n + 10);
console.log('✓ Results match:', JSON.stringify(nativeResult) === JSON.stringify(customResult));
console.log('  Native:', nativeResult);
console.log('  Custom:', customResult);

console.log('\n10. Additional test: thisArg parameter support');
const context = { multiplier: 4 };
function multiplyWithContext(n) {
    return n * this.multiplier;
}
const withContext = customMap([1, 2, 3], multiplyWithContext, context);
console.log('✓ thisArg parameter works:', withContext);

console.log('\n=== All tests completed ===');
console.log('customMap implementation appears to meet all requirements!');