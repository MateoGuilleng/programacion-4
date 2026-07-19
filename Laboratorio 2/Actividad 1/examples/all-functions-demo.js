/**
 * Demonstration of all four custom array methods
 * 
 * This file shows practical examples of using customMap, customReduce,
 * customFilter, and customForEach functions.
 */

const { customMap, customReduce, customFilter, customForEach } = require('../src/index');

console.log('=== Custom Array Methods Demonstration ===\n');

// Example data
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const prices = [19.99, 29.99, 14.99, 9.99, 39.99];
const products = [
    { name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { name: 'Shirt', price: 25, category: 'Clothing', inStock: true },
    { name: 'Coffee Mug', price: 15, category: 'Home', inStock: false },
    { name: 'Headphones', price: 199, category: 'Electronics', inStock: true },
    { name: 'Book', price: 12, category: 'Books', inStock: true },
    { name: 'Desk Lamp', price: 45, category: 'Home', inStock: false }
];

console.log('1. CUSTOM MAP EXAMPLES');
console.log('='.repeat(50));

// Example 1: Double all numbers
console.log('\nExample 1: Double all numbers');
const doubled = customMap(numbers, n => n * 2);
console.log('Numbers:', numbers);
console.log('Doubled:', doubled);

// Example 2: Add tax to prices
console.log('\nExample 2: Add 10% tax to prices');
const pricesWithTax = customMap(prices, price => price * 1.10);
console.log('Original prices:', prices);
console.log('Prices with 10% tax:', pricesWithTax.map(p => p.toFixed(2)));

// Example 3: Extract product names
console.log('\nExample 3: Extract product names');
const productNames = customMap(products, product => product.name);
console.log('Product names:', productNames);

console.log('\n\n2. CUSTOM REDUCE EXAMPLES');
console.log('='.repeat(50));

// Example 1: Sum all numbers
console.log('\nExample 1: Sum all numbers');
const sum = customReduce(numbers, (acc, curr) => acc + curr, 0);
console.log('Numbers:', numbers);
console.log('Sum:', sum);

// Example 2: Find total price of products
console.log('\nExample 2: Find total price of all products');
const totalPrice = customReduce(products, (acc, product) => acc + product.price, 0);
console.log('Total price of all products:', totalPrice.toFixed(2));

// Example 3: Find maximum price
console.log('\nExample 3: Find maximum price');
const maxPrice = customReduce(prices, (max, price) => price > max ? price : max, prices[0]);
console.log('Prices:', prices);
console.log('Maximum price:', maxPrice);

// Example 4: Flatten arrays
console.log('\nExample 4: Flatten array of arrays');
const arrays = [[1, 2], [3, 4], [5, 6]];
const flattened = customReduce(arrays, (acc, curr) => customMap(curr, n => n).concat(acc), []);
console.log('Original arrays:', arrays);
console.log('Flattened:', flattened);

console.log('\n\n3. CUSTOM FILTER EXAMPLES');
console.log('='.repeat(50));

// Example 1: Filter even numbers
console.log('\nExample 1: Filter even numbers');
const evens = customFilter(numbers, n => n % 2 === 0);
console.log('Numbers:', numbers);
console.log('Even numbers:', evens);

// Example 2: Filter expensive products
console.log('\nExample 2: Filter products over $50');
const expensiveProducts = customFilter(products, product => product.price > 50);
console.log('Expensive products:', expensiveProducts);

// Example 3: Filter in-stock electronics
console.log('\nExample 3: Filter in-stock electronics');
const inStockElectronics = customFilter(products, product => 
    product.category === 'Electronics' && product.inStock
);
console.log('In-stock electronics:', inStockElectronics);

// Example 4: Filter by price range
console.log('\nExample 4: Filter products between $20 and $100');
const midRangeProducts = customFilter(products, product => 
    product.price >= 20 && product.price <= 100
);
console.log('Mid-range products:', midRangeProducts);

console.log('\n\n4. CUSTOM FOREACH EXAMPLES');
console.log('='.repeat(50));

// Example 1: Log all products
console.log('\nExample 1: Log all products');
console.log('Product list:');
customForEach(products, (product, index) => {
    console.log(`  ${index + 1}. ${product.name} - $${product.price}`);
});

// Example 2: Build HTML list
console.log('\nExample 2: Build HTML list');
const htmlItems = [];
customForEach(products, product => {
    htmlItems.push(`<li>${product.name}: $${product.price}</li>`);
});
console.log('HTML items:', htmlItems);

// Example 3: Update external state
console.log('\nExample 3: Calculate total and count using external variables');
let total = 0;
let count = 0;
customForEach(prices, price => {
    total += price;
    count++;
});
console.log(`Prices: ${prices}`);
console.log(`Average price: $${(total / count).toFixed(2)}`);

// Example 4: Using thisArg for context
console.log('\nExample 4: Using thisArg for context');
const cart = { items: [] };
function addToCart(product) {
    this.items.push(product.name);
}
customForEach(products.slice(0, 3), addToCart, cart);
console.log('Cart items:', cart.items);

console.log('\n\n5. COMBINING FUNCTIONS');
console.log('='.repeat(50));

// Example: Chain operations
console.log('\nExample: Get total price of in-stock electronics');
const electronicsTotal = customReduce(
    customFilter(products, p => p.category === 'Electronics' && p.inStock),
    (sum, product) => sum + product.price,
    0
);
console.log('Total price of in-stock electronics:', electronicsTotal.toFixed(2));

// Example: Transform and filter
console.log('\nExample: Get discounted prices for expensive products');
const discountedPrices = customMap(
    customFilter(products, p => p.price > 50),
    product => ({ 
        name: product.name, 
        originalPrice: product.price,
        discountedPrice: product.price * 0.8 // 20% discount
    })
);
console.log('Discounted prices for expensive products:', discountedPrices);

console.log('\n\n6. ERROR HANDLING EXAMPLES');
console.log('='.repeat(50));

console.log('\nTrying invalid inputs:');

try {
    console.log('Trying customMap with string instead of array:');
    customMap('not an array', n => n);
} catch (error) {
    console.log('  ✓ Caught error:', error.message);
}

try {
    console.log('\nTrying customReduce with empty array and no initial value:');
    customReduce([], (acc, curr) => acc + curr);
} catch (error) {
    console.log('  ✓ Caught error:', error.message);
}

try {
    console.log('\nTrying customFilter without a function:');
    customFilter([1, 2, 3], null);
} catch (error) {
    console.log('  ✓ Caught error:', error.message);
}

try {
    console.log('\nTrying customForEach with object instead of array:');
    customForEach({ a: 1, b: 2 }, n => console.log(n));
} catch (error) {
    console.log('  ✓ Caught error:', error.message);
}

console.log('\n\n=== Demonstration Complete ===');
console.log('All four custom array methods are working correctly!');