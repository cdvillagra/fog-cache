Fog Cache 
====================

Node.js application that assists in loading pages, and the ability to cache both objects that will be used to render the page, or the whole page in HTML format.

Powered by [DVillagra][1], who always focuses on code distribution and open source applications.

Let's go! Follow the requirements for using the application:

Require
----------------
* Node.js - `* version`
* MongoDB - `* version`
* RESTFUL API (Server service) - `any`
* Knowledge in Jade to make your html
* Knowledge in Sass, if you use the compiler to generate the CSS

Usage
----------------
0. First we need install the dependences of application and of the service

  ```ruby
  // On root directory
  npm install
  // On service directory
  cd core/services
  npm install
  ```
  
0. Before start our application, we will go configure de `DB` file and start the service of mongoDb. Then configure the file in:

  ```
  nano core/constants/conn
  // after, we can start the mongoDB service
  ```

0. Finally let's start the application
  
  ```
  // with debugger active
  set DEBUG=fog-cache:* & npm start
  ```
  OR
  ```
  // with nodemon
  nodemon fog-cache
  ```
  OR
  ```
  // your favorite command to start any node application
  ```

0. Oh Yeah! Your application has been started.

Service
---------
His service should answer something like this:
```
{
  response:
          {
            keyword:keyword, //string
            type:data/html, //string
            content:{}/html //object or string
          }
}        
```

My pages
---------
To create our pages, we need create the methods in controllers and make the views of pages that will be displayed.

Doubts
----------------------
Come on! Open one [issues][2]! =]

License
---------
MIT

[1]: http://dvillagra.com.br
[2]: https://github.com/cdvillagra/fog-cache/issues
