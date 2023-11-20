# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug : 
 - Sign up to the app
 - Create at least 2 others users on people page ( not with signup ) 
 - Edit these profiles and add aditional information 
 - Create a project
 - Input some information about the project
 - Input some activities to track your work in the good project
  
Then, see what happens in the app and fix the bug you found doing that.

## Then
Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions : 
- What bugs did you find ? How did you solve these and why ? 
- Which feature did you develop and why ? 
- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ?

## Answers

# 1. Bugs

bug 1 : user/view.js l.135 : fix update button by replacing the onChange
with an onClick, because we want data to be updated when we click on the
button, otherwise it won't work, a button has a function linked to it by
clicking with onClick, not onChange

bug 2 : user/list.js l.132 : fix the name field in user details. Nothing
was displaid inside because when creating a user, the string written in
Name goes in an input named "username" in the HTML and in the detail view,
the Name field, names "name" that should access the name value couldn't
find it. I renamed the input from the user creation form "name". Now we
even have the name displaid on the user card.

bug 3 : activity/index.js l.39-44 : wasn't possible to select a project and
then to go back on all project because e was undefined so it wasn't
possible to read a name. So if e is undefined, it means none of the project
are selected so all projects is selected. I still don't understand why
nothing change when I select a project it looks like a bug but I don't know
what should happen so I don't know how to fix that.

bug 4 : projects/view.js l.75 : toString() was used to display the name of
the project but project.name already is a string. This was preventing us
from navigate to the detail project window

bug 5 : projects/views l.76+84+87+90 : the project we got was a table so we
should put project[0]. to get values. I think the purpose of this bug was
to understand why here the API was sending a table and to fix that but I
don't have time anymore

bug 6 (not sure) : user/view.js l.63 : I don't know if it's a bug but we
can't edit the name. If we remove "disabled" on the input it would be
possible to edit name

Other bug I've noticed : You can't edit a project, the page just keeps
loading forever. If you create a new project, it won't be displaid
immediately we must reload the page. If I update my email in my account it
isn't saved and if I do it in the user interface, it won't be updated in my
account.
Inside project details, the grid corresponding to months isn't updated when
you update the gris in activity.

# 2. Feature
The feature I’ve added is the possibility to archive a project. I’ve noticed that we couldn’t
delete projects on the app (maybe this was a bug). I’ve thought that it might be normal and
that the goal was too keep all the projects even if they are old and never delete them. So I’ve
thought that it would be a good thing to be able to know if a project is finished. So if you click
on the Archive button inside a project, it will archive it and you won’t be able to edit him
anymore. The project will be displaid filled with green so that we have a visual indicator that
the project is archived. I’ve written things in the project.js file in Api/controller and
Api/models and in scenes/project/views.js and list.js in the App folder.

# 3. Feedback
The test was fun, I like to look for bugs in an App. I encountered some difficulties at the
beginning because of my installation of node.js but I think this was only about my computer
and I’ve been unlucky with that. To do the little feature I had to look for some informations
about API on the web so this was a good idea because I’ve learned things while doing the
test.

