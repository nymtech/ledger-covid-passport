# Nym Private COVID Certificate (PCC) 

The existing Digital Covid Certificates do not provide strong privacy properties, it can expose a lot of information about an individual, and can further be used to create a map of the places the person has visited and therefore be used as a tracking system.

We propose a privacy enhanced version using blinded and re-randomizable Coconut credentials that can tackle the above issues. We call this product Private Covid Certificate (PCC)

## Mobile App

Run the apps in dev mode:

```
npm install
npm run start
```

Go to https://localhost:3000/

> **Note:** the local dev server runs on HTTPS because this is the only way the camera video stream is allowed to be consumed by the browser's script