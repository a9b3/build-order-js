# Build Order JS

A set of Javascript project boilerplates.

## Installation

```sh
npm i -g build-order-js
```

## Usage

```
$ bojs

 Set up your javascript project procedurally

 Usage: bojs  [command] [flags] 
 
 Flags:

   --npm            specify npm client to use [npm || yarn] defaults to npm
   --git            initialize empty git repo
   -h --help        show help
   -v --version     show version
 
 Commands:

   buildorders     apply build orders to the current project
   list            list the available buildorders

```

### List available boilerplates.

```sh
$ bojs list
cli
express
frontend-app
frontend-package
node
react-app
react-package
```

### Use a boilerplate.

```sh
$ bojs buildorders react-app --git --npm yarn
```

## Examples

### Scaffold out a React App

```sh
mkdir project
cd project
bojs buildorders react-app --npm yarn --git
```