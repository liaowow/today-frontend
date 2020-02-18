# TODAY

## Introduction
Welcome to TODAY, an intimate daily journal app. TODAY is a single-page application written in vanilla JavaScript without the aid of frameworks.

## Features
TODAY features CRUD (Create, Read, Update, Delete) functionality for both a user and their journal entries.

When the page initially loads, the sidebar header dynamically renders:
  1. The current weather in the user's location (as an HTML5 animation) if the user allows location data to be shared
  2. The current time in a live clock, using Moment.js

The entries also track a user's current mood as it was entered at the time of creation, which is then used to display an overall trend of moods from past entries in a separate section. The background of the page also changes color to reflect the overall mood trend.

## Dev Tools
- Front End:
  - `bootstrap` - serves as the base for this app's css structure
  - `moment.js` - contains the script for displaying current time
  - `skycons.js` - contains the script for drawing weather icons

- Back End:
  - `Rails` - hosts the database server
  - `Dark Sky` - contains weather data and serves as source for this app's external weather API

## Seed Data
We provided mock data using Faker (Ruby gem) and an image API from Unsplash to create both users and entries.

To test out the app with the richest pre-built data, log in with the usernames:
  - liaowow
  - swb258
