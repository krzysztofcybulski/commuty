# Commuty 🚗

https://commuty.netlify.app

Commuty is an innovative mobile application designed to transform the way you commute. By leveraging the power of geolocation, time-based data and other user preferences, Commuty connects individuals with similar commute routines, fostering a community of shared rides, reduced travel costs, and a greener environment.


## Key Features

1. Personalized Commute Profiles
- Save your daily commute details, including starting and ending coordinates, times, and preferred modes of transport.
- Update your profile effortlessly to accommodate changes in your routine.
 
2. Smart Matching Algorithm
- Advanced algorithm analyzes your commute details and identifies other users with similar routes and schedules.
Receive personalized recommendations for potential commute partners.

3. Ride Together
- Connect with matched users to coordinate shared rides.
- Chat functionality to discuss details and arrangements securely within the app.
 
4. Eco-friendly and Cost-efficient
- Reduce your carbon footprint by sharing rides.
- Save on travel costs through ride-sharing.
 
5. Community Building
- Build a network of commute partners and foster a sense of community.
- Participate in community events and initiatives to promote sustainable commuting.

## Tech details

### Frontend
For front end we used the modern technology:
- React 
- Typescript
- TailwindCSS
- Redux
- Vite

App is being built on `git push` and deployed to Netlify.
Can be locally run with `npm install; npm run dev`.

### Backend
For backend we used old good Spring Boot with Java 21.
For MVP we kept it simple - data is being stored in memory, hovewer it could scale horizontally after switching the storage and adding more instances.

App is being built on `git push` and deployed to Heroku.
Can be locally run with `./gradlew bootRun`.
