---
title: Change launchpad icon grid layout in your MAC
copyright: true
date: 2017-10-26 09:32:26
description: Change launchpad icon grid layout in your MAC
categories: Study
tags:
- launchpad
---

## Change launchpad icon grid layout in your MAC
<!--more-->

### preface
Launchpad is the quick application launcher available from the Mac OS X Dock and a keystroke that looks quite a bit like the Homescreen of iOS. By default, the Launchpad app grid usually displays icons in 7 rows and 5 columns of apps, but with a little adjustment from the command line of OS X you can switch and customize the Launchpad icon grid to any number of apps you’d like to see on the Mac.

This uses the command line and defaults strings to customize the Launchpad grid layout, if you’re not comfortable with Terminal you’re probably better off leaving this alone and enjoying the default Launchpad app icon grid. We’ll combine the commands into a single syntax string for ease of use first, but you can break them apart as we show you a bit further below.

### How to Adjust the Icon Grid Count of Launchpad in Mac OS X
- Open the Terminal found in /Applications/Utilities/ and enter the following command syntax, replacing the X numbers for the appropriate columns and grid icon counts

```
$ defaults write com.apple.dock springboard-columns -int X;defaults write com.apple.dock springboard-rows -int X;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```

> It is:
> 
> $ defaults write com.apple.dock springboard-columns -int X;defaults write com.apple.dock springboard-rows -int X;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock

For example, to set the Launchpad grid to 6×7 you’d use the following syntax:

```
$ defaults write com.apple.dock springboard-columns -int 7;defaults write com.apple.dock springboard-rows -int 6;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```

> It is:
> 
> $ defaults write com.apple.dock springboard-columns -int 7;defaults write com.apple.dock springboard-rows -int 6;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock

- Hit Return and wait for the Dock and Launchpad to refresh

- Open Launchpad as usual to see the layout change

> The settings change is immediate after the Dock refreshes:

![2017-10-26-09](http://ovefvi4g3.bkt.clouddn.com//2017-10-26-09.png)

### How to return to the default setting
If you want to return to the default setting, just change the column and row counts back to what yours was originally. The default on my MacBook Pro Retina display is a 5 x 7 grid, but yours may be different depending on screen size and screen resolution.

```
$ defaults write com.apple.dock springboard-columns -int 7;defaults write com.apple.dock springboard-rows -int 5;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```

> It is:
> 
> $ defaults write com.apple.dock springboard-columns -int 7;defaults write com.apple.dock springboard-rows -int 5;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock

![2017-10-26-10](http://ovefvi4g3.bkt.clouddn.com//2017-10-26-10.png)

#### The commands for customizing the Launchpad layout can also be split apart if desired like so:

**Set the Launchpad Column Icon Count**

```
$ defaults write com.apple.dock springboard-columns -int 3
```

**Set the Launchpad Row App Icon Count**

```
$ defaults write com.apple.dock springboard-rows -int 4
```

**Reset Launchpad**

```
$ defaults write com.apple.dock ResetLaunchPad -bool TRUE;
```

**Relaunch the Dock with killall**

```
$ killall Dock
```

### Credit: 
Original Source: [OSXDaily](http://osxdaily.com/2016/03/09/change-launchpad-icon-grid-layout-mac-os-x/)


