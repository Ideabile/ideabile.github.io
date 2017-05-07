---
title: MangiaFuoco.js solved issue 1
link: http://blog.ideabile.com/2014/11/mangiafuoco-js-solved-issue-1/
author: Ideabile
description: 
post_id: 347
created: 2014/11/23 20:50:19
created_gmt: 2014/11/23 20:50:19
comment_status: open
post_name: mangiafuoco-js-solved-issue-1
status: publish
post_type: post
---

I know you aren't exited about another JS library. But personally I'm feeling I'm going in the right direction, and so on I'm exited to say the issue **#1 **of my Project [MangiaFuoco](https://github.com/M3kH/mangiafuoco) is officially close: <https://github.com/M3kH/mangiafuoco/issues/1> **Are you still curious about MangiaFuoco = MF? **MF is a **JavaScript** tool for build **Compossible Web Applications**. MF try to force you to define a Folder Structure for get a Modular loader in a declarative way. 

This step is really important when you want start a project which can scale without creating a Reference Jungle.

### **MF encourage Web Components Methodology**

> _Web Component for MF are just Distribute Logic._

The only difference is they try to look into a folder structure instead of just a file, so they would use module_name as directory and look for a index.js inside it.

Different of what [Polymer](https://www.polymer-project.org/) Web Components are, _**MF Components are think to required an app context**_ which would make sure that Flavoured Framework Component can access to his own requirement like app.Backbone or app.Marionette or app.Angular.

In this way Components folder can be moved across projects augmenting the granularity of the applications and helping you to create a better reusable code/logics.

### **Extend Projects**

Additional to Web Components blueprints, MF give you the possibility to extend your app project with another app project.

This functionality is not recursive but make you easy to reuse full projects code.

MF with Extend Project functionality intend to means if the file is not in ProjectB then I will look for it in ProjectA;

In this way you can create giants app and extend it with just one file in a ‘empty’ project.

### **Framework Free but not Dependency Free**

MF require Underscore and an AMD environment (Node.js, RequireJS or Browserify), has only dependency. But is framework free and so you can think has a wrap for declare you global ‘app’.

Think to declare global all your dependencies with mf.global({$: jQuery});

and use like this: MF.$(‘something’);

Additional to this MF provide you Adapters, which basically means you can extend MF for integrate with you flavour FrameWork.

#### **Is good practice declare it has a ‘app’**

MF try to simplify the usage of the AMD, delivering you the ability to declare an instance of in in your own way, although MF try to represent the app end point concept, and so on is good practice in example declare it has `app`, but still you are not forced too.

#### **Why I should use it?**

  * You want keep organise your folder system of the your front-end part, you want create more reusable code, you want a easy way to scale your project.
  * You work in Multi Page Web Projects. You work in Single App Project :-)
  * You are tired of require([‘dependencyA’, ‘dependencyB’, ‘dependencyC’]);
  * You are tired of new obj({}); or new view({}).render(); or whatever logic needs your framework for initialise something, which in the end looks like the same.
  * You don’t want create a file for extend one line small customisation.
  * You can customise with you own folder structure.
  * You can use you own Framework or WhateEverFrameWork.
  * You wish this project would grow has a crazy and they would be an uge amount of Components for your setup, which would be make able to make web app like a drag and drop experience.
  * You wish the Author would create a: Grunt-Task, Package Manager and a Yeo Man generator.

**Not convinced yet?** Take a look at the code: <https://github.com/M3kH/mangiafuoco> you can try it, you can test it, you can open an issue, you can blame, you can be critic, you can be constructive, you can inspiring me, you can be pleasant or just leave a compliment or a comment saying what you think.

_Ah I just forgot:_ Tested with: Chrome 38,  Firefox 33.1, Safari 8, IE9+ Currently not supported: IE8>
