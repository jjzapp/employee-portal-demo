var webpack = require('webpack');

module.exports = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    mode: 'development',
    entry: [
        './src/main/resources/static/app.module.ts', // This is pretty much the only line you need in this array.  It gives webpack the entry point for when it's doing it's tree shaking
        './src/main/resources/static/app.config.ts',
        './src/main/resources/static/core/core.module.ts',
        './src/main/resources/static/core/employee/employee.module.ts',
        './src/main/resources/static/core/employee/employee.service.ts',
        './src/main/resources/static/employee-hierarchy/employee-hierarchy.module.ts',
        './src/main/resources/static/employee-hierarchy/employee-hierarchy.component.ts',
        './src/main/resources/static/employee-list/employee-list.module.ts',
        './src/main/resources/static/employee-list/employee-list.component.ts',
    ],
    module: {
        rules: [
            {
                test: /\.ts$/, // Looks for *.ts and *.tsx files, a general regular expression
                exclude: /node_modules/, // Don't look in here for compilation, this gets brought in with the imports in the actual project
                loader: "ts-loader" // One of a handful of loaders, but this one works pretty well
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'] // These are the extensions we care about in the project
    },
    output: { // This whole section is for where we output the compiled code
        path: __dirname + '/src/main/resources/static/build',
        publicPath: '',
        filename: 'bundle.js'
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "angular": "angular",
        "angular-animate": "angular-animate"
    },
};