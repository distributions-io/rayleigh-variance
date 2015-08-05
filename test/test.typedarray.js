/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	variance = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array variance', function tests() {

	it( 'should export a function', function test() {
		expect( variance ).to.be.a( 'function' );
	});

	it( 'should compute the distribution variance', function test() {
		var sigma, actual, expected;

		sigma = new Float64Array( [ 0.5, 1, 2, 4  ] );
		actual = new Float64Array( sigma.length );

		actual = variance( actual, sigma );
		expected = new Float64Array( [ 0.1073009, 0.4292037, 1.7168147, 6.8672588 ] );

		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( variance( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
