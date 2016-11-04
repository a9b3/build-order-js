# Build Order JS

Set up javascript development environment procedurally.

## Installation

```sh
npm i -g build-order-js
```

## Menu

```
$ bojs
  
  build-order-js 1.0.0

    Set up your javascript project procedurally

  Usage: bojs <command> [command arguments] [flags]

  Commands:

    help		show help
    tasks		apply tasks to the current project
  
  Global Options:

    --npm		specify npm client to use [npm || yarn] defaults to npm
    --help, -h		show help for commands
  
```

## Usage

```sh
mkdir project
cd project
bojs tasks bootstrap babel --npm yarn
```

## Dev

```sh
# Install dependencies
yarn
# Link for local development
npm link
# Run command!
bojs
```

### - Task API

- All `dest` fields will be relative to project root dir

#####`shell`

Runs a shell command.

*Note: does not support interactive commands*

```js
await taskApi.shell('echo hi')
```

#####`addPackages`

Adds npm packages.

```js
await taskApi.addPackages({
	packages: [
		'babel-register',
	],
	dev: true,
})
```

#####`addToJsonFile`

Add an object to json file.

```js
await taskApi.addToJsonFile({
	dest: '.babelrc',
	json: {
		"presets": ["stage-0"],
	},
})
```

#####`addToPackageJson`

Add to package.json of project root dir

```js
await taskApi.addToJsonFile({
	json: {
		scripts: {
			foo: 'echo foo',
		},
	},
})
```

#####`addDirectory`

Add directory.

```js
await taskApi.addDirectory({
	dest: 'test',
})
```

#####`addFile`

Add file either by providing a `src` file to copy from or the `fileContent` to put into the `dest` file.

```js
await taskApi.addFile({
	src: path.resolve(__dirname, './foo'),
	// or
	fileContent: 'hi',
	
	dest: './foo',
	override: true,
})
```

#####`templateFile`

Add to `dest` by using a `src` handlebar template.

```js
await taskApi.addFile({
	src: path.resolve(__dirname, './foo'), // handlebars
	args: {}, // for the handlebars
	
	dest: './foo',
	override: true,
})
```


### - Tasks

Tasks are atomic units, a singular task performs one function such as adding a file, making a directory, or adding npm packages. This is exposed through the taskApi object passed into a task function.

When developing a task all you have to do is export an async function, the function will be passed certain opts.

```js
export default async function taskOne({
	env: {},
	options,
	taskApi,
}) {
	await taskApi.addPackages({
		packages: [
			'invariant',
		],
	})
}
```