<!-- ![Logo of the project](https://raw.githubusercontent.com/jehna/readme-best-practices/master/sample-logo.png) -->

# Support Tools
> Support Tools created for everyone, but mainly for Sollid Cabinetry

Currently it consists of a simple XML to CSV converter that can only convert 1 file at a time. In the future this project (and this readme) will be updated with more support related features.

## Installing / Getting started

To work on this project yourself or to use it within your own business follow the instructions below. Node.js is required to run this project.

```shell
npm install
npm run dev
```

When you run the code above it will install all the dependecies included in the package.json file. Then it will open a local web page on port 3000 (localhost:3000 or x.x.x.x:3000)

### Initial Configuration

Install node js which can be found here:https://nodejs.org/en/download and everything else will be installed when running the commands in the installing/ getting started section.

## Developing

To clone this repository and use it yourself please follow the instructions below:

```shell
git clone https://github.com/hbowlby1/Harrisons-Support-Tools.git
cd xmltocsv/
npm install
```

After cloning the repository you will need to change your directory to xmltocsv (this directory will change in the future 5/22/2023). After changing your directory you will need to run that npm install to install all the dependencies required to run the program.

### Building

If you run into an issue when running the program, for instance the page.js is not displaying. Chances are you do not have 'run client' set at the top of the page.js file. This project uses the latest version of next.js.

```shell
#page.js
"use client"
import React from "react"
...
```

<!-- ### Deploying / Publishing

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy awesome-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does. -->

## Features

At the moment this project only converts XML to CSV. It can be used to convert anything from simple XML to advanced XML to CSV. The steps it takes currently is it converts from XML > JSON > flattens JSON > CSV.

<!-- ## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

#### Argument 1
Type: `String`  
Default: `'default value'`

State what an argument does and how you can use it. If needed, you can provide
an example below.

Example:
```bash
awesome-project "Some other value"  # Prints "You're nailing this readme!"
```

#### Argument 2
Type: `Number|Boolean`  
Default: 100

Copy-paste as many of these as you need. -->

## Contributing

<!-- When you publish something open source, one of the greatest motivations is that
anyone can just jump in and start contributing to your project.

These paragraphs are meant to welcome those kind souls to feel that they are
needed. You should state something like: -->

"If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

<!-- If there's anything else the developer needs to know (e.g. the code style
guide), you should link it here. If there's a lot of things to take into
consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here. -->

<!-- ## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/ -->


## Licensing

<!-- One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like: -->

"The code in this project is licensed under MIT license."