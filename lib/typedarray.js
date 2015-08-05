'use strict';

// MODULES //

var VARIANCE = require( './number.js' );


// VARIANCE //

/**
* FUNCTION: variance( out, sigma )
*	Computes the distribution variance for parameters stored in a typed array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} sigma - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function variance( out, sigma ) {
	var len = sigma.length,
		i;
	for ( i = 0; i < len; i++ ) {
		out[ i ] = VARIANCE( sigma[ i ] );
	}
	return out;
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
