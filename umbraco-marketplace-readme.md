# Iconic
Iconic is a highly configurable package that allows you to easily add icon libraries to your Umbraco content.

## Introduction
With Iconic you will be able to create a property editor that can use virtually any font package out there and not only that, you will  be able to select your icon from more than one package on the same property.

## Installation

Use V15 for Umbraco 15.0.0\
Use V5 for Umbraco 10.2.0 and above\
Use V3 for Umbraco 8, 9 & 10.1.0\
Use V2 for Umbraco 8\
Use V1 for Umbraco 7

### IMPORTANT: Upgrading to Iconic V5
From version 5, Iconic is built as a <a href="https://learn.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-6.0&tabs=visual-studio" target="_blank">Razor Class Library</a> (RCL). The dll generated contains all the files that otherwise would go into your `app_plugins` folder.

If you are upgrading from previous Iconic versions, follow these steps (you shouldn't lose any data if you follow the instructions):
- Uninstall the previous Iconic package from your project
- Clean the project (manually delete the bin and obj folders)
- Delete any iconic folders from C:\Users\you-user\.nuget\packages, like Our.Iconic and Our.Iconic.Core
- Install the 5.x.x version

### Nuget
[![NuGet](https://buildstats.info/nuget/Our.Iconic)](https://www.nuget.org/packages/Our.Iconic/)



## Configuration
Once the plugin is installed is time to configure it to your needs.

To learn how to use and configure this plugin, [read our documentation](Documentation).

Handmade by Mario Lopez - 2023 @skartknet
