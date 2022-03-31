# My Usual setting for Angular 12/13


## eslint settings

In ng12 no more migration from tslint to eslint, the project comes with no linter at all, so you just need to add eslint
with:

        ng add @angular-eslint/schematics

## eslint rules

https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md

## usual eslint plugins

to install because missing by default and used but my rules:

         npm i eslint-plugin-jsdoc
         npm i eslint-plugin-import
         npm i eslint-plugin-prefer-arrow

All in one line

         npm i eslint-plugin-prefer-arrow eslint-plugin-import eslint-plugin-jsdoc

## Webstorm

- activate Eslint Automatic config + fix on save option
- and disable tslint !
- Go to Tools -> Actions On Save and check - reformat Code, Optimize Imports, Rearrange Code Run code cleanup and run
  eslint --fix
 
## strict mode in template is not easy at first

I tried to switch to false in tsconfig.json

        "strictTemplates": false

Ok you don't have any problem, but no help either. So after testing it, I don't recommend it.

So the 2 syntax you will need to solve most typescript syntax errors is:  $any and the ! (or ?) operator .... like in:

        <input (keyup)="value2=$any($event.target).value" />

https://www.tektutorialshub.com/angular/property-value-does-not-exist-on-type-eventtarget-error-in-angular/
https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error

In TS with NG12+ you are in strictNullCheck mode by default so if a variable is NOT initialized to a type directly, it
fails because the var cannot be of type undefined. To escape this check add the ! like in

        class Pipo {
             myTitle!: string; // will not raise any error even in stricNullCheck mode
        }

Otherwise ERROR : TS2564: Property 'myTitle' has no initializer and is not definitely assigned in the constructor.
 
