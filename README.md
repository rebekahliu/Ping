# Ping

## Overview

Ping is a privacy-conscious, location-sharing mobile app. When you ping your friends to get their location, the app automatically sends them your location too. By leveraging social relationship and trust, Ping allows users to make their location available 24/7, but ensures that location is only accessed when it matters.

### The Problem

In our day to day lives, we often find ourselves texting friends asking about location. However, it can often take too long to get a response. We want instant access location to friend location when it matters, but without invading privacy. There's a need for an app that implements general purpose location-sharing without letting others abuse their access.

### The Solution

Ping is unique in that it allows you access to friend location 24/7, but due to the reciprocal location sharing, users can't abuse the feature, or use it in a creepy way. By alerting people when you've pinged them, Ping makes sure users are only requesting location info when they have good reason to. Reciprocal location sharing also helps speed the process of arranging to meet up somewhere, or coordinate plans in general. Not only does reciprocal location sharing prevent misuse of the app, it's the natural progression of "where are you?" conversations anyways! Ping makes location sharing easier, faster, more accessible, and more private, all at once.

## Functionalities and MVPs

- Facebook auth
- Suggested friends list from FB
- Location sharing (based on visibility radius)
- Emergency pings (overrides visibility radius) + other kinds?
- In-app messaging
- Profile customization (visibility radius, safe locations)
- Demo Website

## Technologies

- Ruby on Rails
- React Native
- Map APIs (Geokit)
- Messaging APIs
- Facebook Graph API (Koala)
- Redis

## Wireframes

![wire-frames][wireframes]

[wireframes]: https://github.com/rebekahliu/Ping/blob/master/wireframes.png

## Timeline

### Phase 1: Learn Technologies (2 days)

- React Native, Redis, FB Graph/Auth - ALL
- Messaging APIs - Rebekah, Betty
- Map APIs - Tommy

### Phase 2: Fix existing features (3 days)

- Modify friend adding (1/2 day) - Betty
- Modify notifications/location update (1/2 day) - Rebekah
- Rebuild frontend and core Ping feature (2-3 days) - Tommy, ALL

### Phase 3: Building new features (3 days)

- Messaging (2-3 days) - Rebekah, Betty
- Friend add (1-2 days) - Betty
- Profile (2 days) - Tommy

### Phase 4: Finishing touches (2 days)

- Make app pretty (1-2 days) - Rebekah
- Create demo page (1 day) - Betty
- Get on app/play store (1 day) - Tommy

## Plan to get more users/reviews

Get our friends to use/share
