# Build Order JS

Set up javascript development environment procedurally. This tool comes with a few preset build orders but the goal is for individuals to create their own build orders and tasks that they can share. However feel free to use the preset build orders if it fits your needs.

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

### list

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

### buildorder

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