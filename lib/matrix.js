'use strict';

// MODULES //

var VARIANCE = require( './number.js' );


// VARIANCE //

/**
* FUNCTION: variance( out, x )
*	Computes the distribution variance for each parameter stored in a matrix.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function variance( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'variance()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = VARIANCE( x.data[ i ] );
	}
	return out;
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
