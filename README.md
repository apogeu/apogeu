# apogeu

[![Build Status](https://travis-ci.org/apogeu/apogeu.svg?branch=master)](https://travis-ci.org/apogeu/apogeu)
[![Code Climate](https://codeclimate.com/github/apogeu/apogeu/badges/gpa.svg)](https://codeclimate.com/github/apogeu/apogeu)
[![Dependency Status](https://david-dm.org/apogeu/apogeu.svg)](https://david-dm.org/apogeu/apogeu#info=dependencies)
[![devDependency Status](https://david-dm.org/apogeu/apogeu/dev-status.svg)](https://david-dm.org/apogeu/apogeu#info=devDependencies)
[![npm download](https://img.shields.io/npm/dt/apogeu.svg)](https://www.npmjs.com/package/apogeu)
[![npm version](https://img.shields.io/npm/v/apogeu.svg)](https://badge.fury.io/js/apogeu)

Apogeu is a multi platform rails like framework made for Node.js.

Apogeu client bootstraps Node.js web projects and structures with
simple commands like: `apogeu new my-project` or `apogeu create service myService`.
Model structures are created from mustache templates that may be changed if needed.

Apogeu projects follows modern conventional patterns and should be easy to use, understand and extend.

## Installation
> npm install apogeu -g

That's it? Yes!

## Usage
> apogeu new [project_name]

Creates a new project. If no project name is given, Apogeu will use current folder as the project folder and it's name as project's name.

> create <type> [all|middleware|controller|service|model] <model_name>

Creates a project structure based on the given model's name.

> apogeu start

Starts the project contained in the current folder.

> apogeu test

Run app tests.

### Options
* `--version, -v`
    - Shows your apogeu-cli version.
* `--debug, -d`
    - May be used with any command. Shows debug information in the console.
* `--api`
    - Changes a command behaviour to create API structures only.
* `--help, -h`
    - Shows help.

## License
[Licence](LICENSE) © Apogeu
