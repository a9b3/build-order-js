# Build Order JS

<p align="center" style="font-size: 1.2rem;">CLI to procedurally generate boilerplate projects.</p>

```sh
yarn global add build-order-js
```

or

```sh
npm i -g build-order-js
```

A collection of common JS project repository tasks. Or run a combination of
tasks to bootstrap a project.

## Table of Content

<!-- toc -->
<!-- tocstop -->

## Usage

#### List all buildorders

```sh
bojs list
```

#### Execute a buildorder

Make sure to run this command inside the project folder.

Ex.

```sh
mkdir project
cd project
bojs buildorders react-app --git --npm yarn
```
