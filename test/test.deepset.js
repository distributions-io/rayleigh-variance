/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	variance = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the distribution variance and deep set', function test() {
		var data, expected;

		data = [
			{'x':0.5},
			{'x':1},
			{'x':2},
			{'x':4}
		];

		data = variance( data, 'x' );
		expected = [
			{'x':0.1073009},
			{'x':0.4292037},
			{'x':1.7168147},
			{'x':6.8672588}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-5 ) );

		// Custom separator...
		data = [
			{'x':[9,0.5]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,4]}
		];

		data = variance( data, 'x/1', '/' );
		expected = [
			{'x':[9,0.1073009]},
			{'x':[9,0.4292037]},
			{'x':[9,1.7168147]},
			{'x':[9,6.8672588]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-5 ), 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( variance( [], 'x' ), [] );
		assert.deepEqual( variance( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = variance( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
