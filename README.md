Variance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) distribution [variance](https://en.wikipedia.org/wiki/variance).

The [variance](https://en.wikipedia.org/wiki/variance) for a [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) random variable is

<div class="equation" align="center" data-raw-text="\operatorname{Var}\left( X \right) = \frac{4 - \pi}{2} \sigma^2" data-equation="eq:variance">
	<img src="https://cdn.rawgit.com/distributions-io/rayleigh-variance/e837487094004e27ea4ed58c980e416e98c47fed/docs/img/eqn.svg" alt="Variance for a Rayleigh distribution.">
	<br>
</div>

where `sigma > 0` is the scale parameter.


## Installation

``` bash
$ npm install distributions-rayleigh-variance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var variance = require( 'distributions-rayleigh-variance' );
```

#### variance( sigma[, opts] )

Computes the [variance](https://en.wikipedia.org/wiki/variance) for a [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) distribution with parameter `sigma`. `sigma` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = variance( 0.5 );
// returns ~0.107

sigma = [ 0.5, 1, 2, 4 ];
out = variance( sigma );

// returns [ ~0.107, ~0.429, ~1.717, ~6.867 ]

sigma = new Float32Array( sigma );
out = variance( sigma );
// returns Float64Array( [~0.107,~0.429,~1.717,~6.867] )

sigma =  matrix( [ 0.5, 1, 2, 4 ], [2,2] );
/*
	[ 0.5 1,
	  2 4 ]
*/

out = variance( sigma );
/*
	[ ~0.107 ~0.429,
	  ~1.717 ~6.867 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var sigma = [
	[0,0.5],
	[1,1],
	[2,2],
	[3,4]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = variance( sigma, {
	'accessor': getValue
});
// returns [ ~0.107, ~0.429, ~1.717, ~6.867 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var sigma = [
	{'x':[9,0.5]},
	{'x':[9,1]},
	{'x':[9,2]},
	{'x':[9,4]}
];

var out = variance( sigma, 'x|1', '|' );
/*
	[
		{'x':[9,~0.107]},
		{'x':[9,~0.429]},
		{'x':[9,~1.717]},
		{'x':[9,~6.867]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var sigma, out;

sigma = new Float64Array( [ 0.5,1,2,4 ] );

out = variance( sigma, {
	'dtype': 'int32'
});
// returns Int32Array( [ 0,0,1,6 ] )

// Works for plain arrays, as well...
out = variance( [0.5,1,2,4], {
	'dtype': 'int32'
});
// returns Int32Array( [ 0,0,1,6 ] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var sigma,
	bool,
	mat,
	out,
	i;

sigma = [ 0.5, 1, 2, 4 ];

out = variance( sigma, {
	'copy': false
});
// returns [ ~0.107, ~0.429, ~1.717, ~6.867 ]

bool = ( data === out );
// returns true

mat = matrix( [ 0.5, 1, 2, 4 ], [2,2] );
/*
	[ 0.5 1,
	  2 4 ]
*/

out = variance( mat, {
	'copy': false
});
/*
	[ ~0.107 ~0.429,
	  ~1.717 ~6.867 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a positive number, the [variance](https://en.wikipedia.org/wiki/variance) is `NaN`.

	``` javascript
	var sigma, out;

	out = variance( -1 );
	// returns NaN

	out = variance( 0 );
	// returns NaN

	out = variance( null );
	// returns NaN

	out = variance( true );
	// returns NaN

	out = variance( {'a':'b'} );
	// returns NaN

	out = variance( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	sigma = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = variance( sigma, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = variance( sigma, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = variance( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	variance = require( 'distributions-rayleigh-variance' );

var sigma,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
sigma = new Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i + 1;
}
out = variance( sigma );

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

// Typed arrays...
sigma = new Float64Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i + 1;
}
out = variance( sigma );

// Matrices...
mat = matrix( sigma, [5,2], 'float64' );
out = variance( mat );

// Matrices (custom output data type)...
out = variance( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-rayleigh-variance.svg
[npm-url]: https://npmjs.org/package/distributions-rayleigh-variance

[travis-image]: http://img.shields.io/travis/distributions-io/rayleigh-variance/master.svg
[travis-url]: https://travis-ci.org/distributions-io/rayleigh-variance

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/rayleigh-variance/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/rayleigh-variance?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/rayleigh-variance.svg
[dependencies-url]: https://david-dm.org/distributions-io/rayleigh-variance

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/rayleigh-variance.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/rayleigh-variance

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/rayleigh-variance.svg
[github-issues-url]: https://github.com/distributions-io/rayleigh-variance/issues
