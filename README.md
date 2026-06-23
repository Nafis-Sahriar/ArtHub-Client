# ArtHub – A Digital Marketplace for Artists and Collectors

ArtHub started with a simple idea: talented artists deserve a better place to showcase and sell their work, 
and art lovers deserve an easier way to discover and collect unique pieces.

ArtHub was built to create a more modern experience where artists can focus on sharing their creativity and collectors 
can easily find artwork they genuinely love. From traditional oil paintings to digital illustrations, ArtHub provides a 
dedicated platform where art takes center stage.

The application is designed with a clean and modern interface, making the experience feel more like browsing a 
professional gallery than scrolling through a typical marketplace.

---

## Technology Stack

### Frontend

* Next.js  
* React 
* Tailwind CSS 
* HeroUI
* Framer Motion
* Recharts
* React Hot Toast
* Lucide React
* Gravity UI Icons
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT Authentication
* Stripe API - Payment processing and subscription management
* ImgBB API


## What Users Can Do

### For Artists

Artists can upload and manage their artwork through a dedicated dashboard. 


The Artist's Dashboard Routes are
  1. `/artist/dashboard` - The main dashboard where artists can see an overview of their artwork, sales, and account information.
  2. `/artist/artworks` - A page where artists can view, edit, and delete their uploaded artwork.
  3. `/artist/artworks/new` - A page where artists can upload new artwork, including details like title, description, price, and image.
  4. `/artist/artworks/[id]` - A page where artists can view and edit the details of a specific artwork by its ID.
  5. `/artist/profile` - A page where artists can manage their account settings, including profile information and subscription plans.
  6. `/artist/subscription` - A page where artists can view and manage their subscription plans, including upgrading or downgrading their plan.
  7. `/artist/support` - A page where artists can submit support tickets and view the status of their existing tickets.

  
   They can build their portfolio, keep track of sales, and update artwork information whenever needed. Images are uploaded directly to ImgBB, making the process quick and reliable.

### For Collectors

Collectors can browse available artwork, search for specific styles, and maintain their personal collections. The platform also includes subscription plans that provide different purchase limits based on the selected tier.

### For Administrators

Administrators have access to management tools that help oversee platform activities, review support requests, and maintain a safe and organized marketplace environment.

---

## Authentication & User Management

ArtHub uses Better Auth to provide a secure authentication system. Users can create accounts using email and password or sign in with their Google account.

To make onboarding seamless, social logins automatically receive a default Buyer role and a Free subscription plan, allowing new users to start exploring the platform immediately without additional setup.

---

## Artwork Discovery Experience

Finding artwork is one of the most important parts of the platform, so special attention was given to search and filtering features.

Users can:

* Search artworks instantly with a debounced search system.
* Filter by medium such as Oil Painting, Watercolor, Digital Art, and more.
* Set minimum and maximum price ranges.
* Sort artwork efficiently while prioritizing available pieces before sold items.

This ensures collectors spend less time searching and more time discovering artwork they might want to own.

---

## Subscription & Payments

ArtHub integrates Stripe to handle subscription upgrades securely.

When a user purchases a new subscription plan, the platform automatically updates their session 
and interface without requiring them to log out and sign back in. The entire process feels smooth 
and immediate from the user's perspective.

---

## Support System

The platform includes a centralized support system where users can submit tickets whenever they need assistance.
Each ticket is automatically linked with the user's authenticated account information, reducing errors and improving security. 
Administrators can review incoming requests, track their status, and resolve issues directly from an admin dashboard.

---

## Why I Built This

ArtHub was created as a full-stack project to explore how a modern digital marketplace works in practice. The goal was not only to build an attractive user interface but also to solve real-world challenges such as authentication, role-based access control, subscription management, secure payments, image hosting, and dynamic data filtering.

The project combines a modern Next.js frontend with an Express and MongoDB backend to create a complete marketplace experience that is scalable, responsive, and user-friendly.

It represents my effort to build something that feels like a real product rather than just another CRUD application.
