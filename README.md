# apogeu-cli

[![Build Status](https://travis-ci.org/apogeu/apogeu-cli.svg?branch=master)](https://travis-ci.org/apogeu/apogeu-cli)

Apogeu is a multi platform rails like framework made for Node.js.

Apogeu client bootstraps Node.js web projects and structures with
simple commands like: `apogeu new my-project` or `apogeu create service myService`.
Model structures are created from mustache templates that may be changed if needed.

Apogeu projects follows modern conventional patterns and should be easy to use, understand and extend.

## Installation
> npm install apogeu-cli

That's it? Yes!

## Usage
> apogeu new [project_name]

Create a new project. If no project name is given, Apogeu will use current folder as the project folder and it's name as project's name.

> create <type> [all|middleware|controller|service|model] <model_name>

Creates a project structure based on the given model's name.

> apogeu start

Starts the project contained in the current folder.

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
[Licence](https://raw.githubusercontent.com/apogeu/apogeu-cli/master/LICENSE) © Apogeu
