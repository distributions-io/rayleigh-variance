'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var variance1 = require( './number.js' ),
	variance2 = require( './array.js' ),
	variance3 = require( './accessor.js' ),
	variance4 = require( './deepset.js' ),
	variance5 = require( './matrix.js' ),
	variance6 = require( './typedarray.js' );


// VARIANCE //

/**
* FUNCTION: variance( sigma[, opts] )
*	Computes the distribution variance.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} sigma - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} distribution variance(s)
*/
function variance( sigma, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( isNumber( sigma ) || isnan( sigma ) ) {
		return variance1( sigma );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( sigma ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'variance()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( sigma.length );
			out = matrix( d, sigma.shape, dt );
		} else {
			out = sigma;
		}
		return variance5( out, sigma );
	}
	if ( isTypedArrayLike( sigma ) ) {
		if ( opts.copy === false ) {
			out = sigma;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'variance()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( sigma.length );
		}
		return variance6( out, sigma );
	}
	if ( isArrayLike( sigma ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return variance4( sigma, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = sigma;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'variance()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( sigma.length );
		}
		else {
			out = new Array( sigma.length );
		}
		if ( opts.accessor ) {
			return variance3( out, sigma, opts.accessor );
		}
		return variance2( out, sigma );
	}
	return NaN;
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;
