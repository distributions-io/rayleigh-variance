'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );

// FUNCTIONS //

var pow = Math.pow;


// CONSTANTS //

var PI = Math.PI;


// VARIANCE //

/**
* FUNCTION variance( sigma )
*	Computes the distribution variance for a Rayleigh distribution with parameter sigma.
*
* @param {Number} sigma - scale parameter
* @returns {Number} distribution variance
*/
function variance( sigma ) {
	var s2;
	if ( !isPositive( sigma ) ) {
		return NaN;
	}
	s2 = pow( sigma, 2 );
	return ( ( 4 - PI ) / 2 ) * s2;
} // end FUNCTION variance()


// EXPORTS

module.exports =  variance;
