# File Explorer

This is desktop app, which is responsible for file exploring, is implemented using [Electron](https://www.electronjs.org/) 
and client side is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
Both parts are implemented using [TypeScript](https://www.typescriptlang.org/) programming language.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
which means to run two processes concurrently at the same time, one is rewired react app listening at port 3000 (Open [http://localhost:3000](http://localhost:3000) to view it in the browser) and typescript compiler watching for electron files changes.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
