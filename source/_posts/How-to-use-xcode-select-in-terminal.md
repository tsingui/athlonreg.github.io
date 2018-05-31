---
title: How to use xcode-select in terminal
copyright: true
date: 2017-09-03
categories: Hackintosh
description: How to use xcode-select in terminal
tags:
- 终端
- Mac
- Xcode
---

## How to use xcode-select in terminal
<!--more-->

## It’s not uncommon developers to have multiple versions of Xcode installed. For example, I typically have the latest beta as well as the most current production release installed.

However, there are times when you may want various tools, such as xcodebuild, to point to a specific Xcode folder. To faciliate this, you can use xcode-select. A common use case is if you use scripts and/or makefiles to build your projects.
Once you set the Xcode folder, xcodebuild will be invoked from the folder you specified.
The command line options are below:

```
xcode-select [-help]
xcode-select [-switch xcode_folder_path]
xcode-select [-print-path]
xcode-select [-version]
```
 
## Here is how to print the current Xcode path:

```
$ xcode-select --print-path
/Developer/Applications/Xcode.app
```

Line number 2 shows the current version of Xcode that is ‘active.’ If you are accessing xcodebuild or other related tools from a script, –print-path is the preferred means to determine the current Xcode location.
Use the -switch option to change to another version of Xcode on your system:

```
$ sudo xcode-select --switch /Applications/Xcode-beta.app/Contents/Developer
```
    
This changes to the Xcode-beta 9 on my system. Note that root access is required to set the Xcode location, thus I have used sudo to execute the command as root.
Printing the path now looks as follows:

```
$ xcode-select --print-path
/Applications/Xcode-beta.app/Contents/Developer
```
    
## To switch back to Xcode installed in the /Applications directory:

```
$ sudo xcode-select -switch /Applications/Xcode.app/
```
    
## You can read more about xcode-select by view the man page from a terminal:

```
$ man xcode-select
```

