'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	VARIANCE  = require( './number.js' );


// VARIANCE //

/**
* FUNCTION: variance( arr, path[, sep] )
*	Computes the distribution variance and deep sets the input array.
*
* @param {Array} arrays - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function variance( arr, path, sep ) {
	var len = arr.length,
		opts = {},
		dget,
		dset,
		v, i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			v = dget( arr[ i ] );
			if ( typeof v === 'number' ) {
				dset( arr[i], VARIANCE ( v ) );
			} else {
				dset( arr[i], NaN );
			}
		}
	}
	return arr;
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
