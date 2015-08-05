'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );


// VARIANCE //

/**
* FUNCTION variance( sigma )
*	Computes the distribution variance for a Rayleigh distribution with parameter sigma.
*
* @param {Number} sigma - scale parameter
* @returns {Number} distribution variance
*/
function variance( sigma ) {
	if ( !isPositive( sigma ) ) {
		return NaN;
	}
	return ( ( 4 - PI ) / 2 ) * s2;
} // end FUNCTION variance()


// EXPORTS

module.exports =  variance;
