# Ping

[Expo Link](https://expo.io/@tkettle220/Ping)

[Ping Demo](https://rebekahliu.github.io/ping-demo-page/)

## Overview

Ping is a privacy-conscious, location-sharing mobile app. When you ping your friends to get their location, the app automatically sends them your location too. By leveraging social relationship and trust, Ping allows users to make their location available 24/7, but ensures that location is only accessed when it matters.

## The Problem

In our day to day lives, we often want instant access to friends' locations, but without invading privacy. There's a need for an app that implements general purpose location-sharing without letting others abuse their access.

## The Solution

Ping is unique in that it allows you access to friend location 24/7, but due to reciprocal location sharing, users can't abuse the feature. By alerting the receiving party when you've accessed their location, Ping makes sure users are only requesting location info when they have good reason to. Reciprocal location sharing also helps speed up the process of arranging to meet up, or coordinating plans in general. Not only does reciprocal location sharing prevent misuse of the app, it's the natural progression of "where are you?" conversations anyways! Ping makes location sharing easier, faster, more accessible, and more private, all at once.

## Functionalities

### Facebook Authenication
### Friend Suggestions

Ping is able to dynamically suggest friends for users to add. By comparing the user's Facebook friends with the list of existing Ping users, we are able to provide the user with a list of all their friends on Ping.

### Location Sharing (based on visibility radius)
- Emergency pings (overrides visibility radius) + other kinds?
### In-app Messaging
### Profile Customization (visibility radius, safe locations)

## Technologies

- Ruby on Rails
- React Native
- Map APIs (Geokit)
- Messaging APIs
- Facebook Graph API (Koala)
- Redis
- Expo
