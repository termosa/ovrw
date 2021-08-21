const { resolve: pathResolve } = require('path')
const Bundler = require('parcel-bundler')
const fs = require('fs-extra')

const resolveOvrw = path => pathResolve(path, '.ovrw')

function runParcel(path, port, buildDist) {
  const ovrwDir = resolveOvrw(path)
  // Single entrypoint file location:
  const entryFiles = pathResolve(ovrwDir, 'index.html')
  // OR: Multiple files with globbing (can also be .js)
  // const entryFiles = './src/*.js'
  // OR: Multiple files in an array
  // const entryFiles = ['./src/index.html', './some/other/directory/scripts.js']

  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, {
    outDir: buildDist || pathResolve(ovrwDir, 'dist'), // The out directory to put the build files in, defaults to dist
    outFile: 'index.html', // The name of the outputFile
    publicUrl: '/', // The url to serve on, defaults to '/'
    watch: !buildDist, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: pathResolve(ovrwDir, 'cache'), // The directory cache gets put in, defaults to .cache
    contentHash: !!buildDist, // Disable content hash from being included on the filename
    global: 'ovrw', // Expose modules as UMD under this name, disabled by default
    minify: !!buildDist, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // Browser/node/electron, defaults to browser
    bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
    //https: { // Define a custom {key, cert} pair, use true to generate one or false to use http
      //cert: './ssl/c.crt', // Path to custom certificate
      //key: './ssl/k.key' // Path to custom key
    //},
    logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
    hmr: !buildDist, // Enable or disable HMR while watching
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: !!buildDist, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
    autoInstall: false, // Enable or disable auto install of missing dependencies found during bundling
  })

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  if (buildDist) bundler.bundle()
  else bundler.serve(port)
}

module.exports = function run(path = process.cwd(), opts = {}) {
  const port = opts.port || 8750
  fs.copy(pathResolve(__dirname, 'src'), resolveOvrw(path))
    .then(() => runParcel(path, port, opts.dist))
}