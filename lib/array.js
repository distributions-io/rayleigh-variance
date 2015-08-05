'use strict';

// MODULES //

var VARIANCE = require( './number.js' );


// VARIANCE //

/**
* FUNCTION: variance( out, sigma )
*	Computes the distribution variance for parameters stored in an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} sigma - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function variance( out, arr ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof arr[ i ] === 'number' ) {
			out[ i ] = VARIANCE( arr[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
