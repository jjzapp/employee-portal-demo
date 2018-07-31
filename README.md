# Employee Portal Demo

## Overview

This is a demo web application which shows employees in a list and hierarchy 
view.  It uses the application frameworks Spring Boot and AngularJS.

## Spring Boot Back-end

The back-end is a Spring Boot application using Java.  It provides an employee 
API.

The source code is in folders `src/main/java` and `src/test/java`.

### Prerequisites

The prequisities for building:
* JDK 1.8 or later
* Maven 3.2+

### Build and Run

To build and run the application, execute:

```
mvn spring-boot:run
```

You can then open [http://localhost:8080/api/employees](http://localhost:8080/api/employees) 
to see the API running.

### Tests

To build and run unit tests, execute:

```
mvn test
```

## AngularJS Front-end

The front-end is an AngularJS application.  It is a client to the back-end 
employee API.

The source code is in folder `src/main/resources/static`.

Note: There is currently both a JavaScript and TypeScript version of the 
front-end script, with the code side-by-side.  The move to TypeScript is 
work-in-progress.

### Prerequisites

Install the front-end prequisites by running:

```
npm install
```

### Build and Run

To build and run the front-end using JavaScript, execute:
```
mvn spring-boot:run
```
You can then open [http://localhost:8080/index.html](http://localhost:8080/index.html) 
to see the front-end and back-end running together.

To build and run the front-end using TypeScript, execute:
```
npm webpack
mvn spring-boot:run
```
You can then open [http://localhost:8080/indexts.html](http://localhost:8080/indexts.html) 
to see the front-end and back-end running together.

### Tests

To build and run unit tests, which are using JavaScript, execute:
```
npm test
```

## Further Development

Here are some ideas for further development:
* Front-end code and tooling
  * Add Webpack support for dev, test, production
  * Use Webpack to create 3 main entry points `main.js`, `vendor.js`, 
    and `style.css`, bundling application code, vendor code, and CSS
  * Karma to use Webpack and TypeScript tests
  * Remove Bower usage
  * Remove JavaScript version, leaving only TypeScript
* Back-end API functionality
  * Paging support
  * Full CRUD support
  * API for hierarcy, which can return sub-sections, starting from any employee