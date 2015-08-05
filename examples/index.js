'use strict';

var matrix = require( 'dstructs-matrix' ),
	variance = require( './../lib' );

var sigma,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
sigma = new Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i;
}
out = variance( sigma );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = {
		'x': sigma[ i ]
	};
}
out = variance( sigma, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Deep set arrays...
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = {
		'x': [ i, sigma[ i ].x ]
	};
}
out = variance( sigma, {
	'path': 'x/1',
	'sep': '/'
});
console.log( 'Deepset:');
console.dir( out );
console.log( '\n' );


// ----
// Typed arrays...
sigma = new Float64Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i;
}
tmp = variance( sigma );
out = '';
for ( i = 0; i < sigma.length; i++ ) {
	out += tmp[ i ];
	if ( i < sigma.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( sigma, [5,2], 'float64' );
out = variance( mat );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = variance( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', out.dtype, out.toString() );
