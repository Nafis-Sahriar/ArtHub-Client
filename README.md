# ArtHub – A Digital Marketplace for Artists and Collectors

ArtHub started with a simple idea: talented artists deserve a better place to showcase and sell their work, 
and art lovers deserve an easier way to discover and collect unique pieces.

ArtHub was built to create a more modern experience where artists can focus on sharing their creativity and collectors 
can easily find artwork they genuinely love. From traditional oil paintings to digital illustrations, ArtHub provides a 
dedicated platform where art takes center stage.

The application is designed with a clean and modern interface, making the experience feel more like browsing a 
professional gallery than scrolling through a typical marketplace.

---

## Live Demo
You can explore the live demo of ArtHub at [https://arthub-client-teal.vercel.app/](https://arthub-client-teal.vercel.app/).




## Technology Stack npm Package used

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
* Google OAuth 

### Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT Authentication
* Stripe API - Payment processing and subscription management
* ImgBB API
* Jose-CJS - JSON Web Token (JWT) library for Node.js



## What Users Can Do

### For Visitors

A visitor can browse the platform without creating an account, allowing them to explore artworks, search, filter and even to see details, they can contact with arthub admin using their mail to ask any question they have, but they can't purchase or upload any artwork until they create an account and sign in.

### For Artists

Artists can upload and manage their artwork, manage their profile, track and observe their sales through a dedicated dashboard. 

The Artist's Dashboard Routes are
  1. `dashboard/artist`            - The main dashboard where artists can see an overview of their artwork, sold counts, and revenue.
  2. `dashboard/artist/arts`       - A page where artists can view, edit, and delete their uploaded artwork.
  3. `dashboard/artist/arts/new`   - A page where artists can upload new artwork, including details like title, description, price, and image.
  4. `dashboard/artist/arts/[id]`  - A page where artists can view and edit the details of a specific artwork by its ID.
  5. `dashboard/artist/profile`    - A page where artists can manage their account settings, including profile information and subscription plans.
  6. `dashboard/artist/support`    - A page where artists can submit support tickets and view the status of their existing tickets.
  7. `dashboard/artist/sales`      - A page where artists can track their sales history, view details of each sale, and analyze their revenue overtime.
  8. `dashboard/artist/purchases`  - A page where artists can see their own purchases. This allows them to keep track of artwork they have bought from other artists on the platform.


### For Collectors

Collectors can browse available artwork, search for specific categories, and maintain their personal collections. The platform also includes subscription plans that provide different purchase limits based on the selected tier. Such as on free tier, a buyer can purchase 3 arts, while on the premium tier they can purchase up to 9 and on premium plan they can purchase 
unlimited artworks.

The Buyer's Dashboard Routes are

  1. `dashboard/buyer`             - The main dashboard where buyers can see an overview of their collection, recent purchases, total number of collected arts, total investment, and the highest valued artwork.
  2. `dashboard/buyer/purchases`   - A page where buyers can view and manage their personal collection of purchased artwork.
  3. `dashboard/buyer/profile`     - A page where buyers can manage their account settings, including profile information and subscription plans.
  4. `dashboard/buyer/support`     - A page where buyers can submit support tickets and view the status of their existing tickets.
  5. `dashboard/buyer/billing`     - A page where buyers can view their billings, which includes their subscription plan details and monthly Acquisition Quota.


### For Administrators

Administrators have access to management tools that help oversee platform activities, review support requests, and maintain a safe and organized marketplace environment.

The Admin Dashboard Routes are

  1. `dashboard/admin`             - The main dashboard where administrators can see an overview of platform activities, including total users, total artwork, total artist, total sales, a pie chart to show revenue by category and a bar-chart to show platform inventory.
  2. `dashboard/admin/users`       - A page where administrators can view and manage all registered users, and he can change the role of a user , toggle between buyer, artist and admin.
  3. `dashboard/admin/arts`        - A page where administrators can view and manage all uploaded artwork, including the ability to remove inappropriate content or resolve disputes.
  4. `dashboard/admin/transactions`- A page where administrators can view all the transactions that has ever happened on the platform , including details such as buyer name, transaction id, date, time, and amount. 
  5. `dashboard/admin/support`      - A page where administrators can review and respond to support tickets submitted by users, ensuring timely assistance and resolution of issues.

---

## Authentication & User Management

ArtHub uses Better Auth to provide a secure authentication system. Users can create accounts using email and password or sign in with their Google account.
When a user signs up using google OAuth, the platform automatically gives him the role of a buyer and a free subscription plan, which was done using Better Auth's database hook.

---

## Artwork Discovery Experience

Finding artwork is one of the most important parts of the platform, so special attention was given to search and filtering features.

Users can:

* Search artworks instantly with a debounced search system.
* Filter by category such as Oil Painting, Watercolor, Digital Art, and more.
* Set minimum and maximum price ranges.
* Sort artwork efficiently while prioritizing available pieces before sold items.

Searching and filtering are designed to be fast and responsive .

---

## Subscription & Payments

ArtHub integrates Stripe to handle subscription upgrades and any art purchases securely.

When a user purchases a new subscription plan, the platform automatically updates their session 
and interface without requiring them to log out and sign back in. The entire process feels smooth 
and immediate from the user's perspective.

Also when a buyer purchases an artwork, the system checks their subscription plan to ensure they have not exceeded their purchase limit. 
If the purchase is successful, the buyer's collection is updated, and the artist's sales data and overall platform revenue are updated in real-time.

---

## Support System

The platform includes a centralized support system where users can submit tickets whenever they need assistance.
Each ticket is automatically linked with the user's authenticated account information, reducing errors and improving security. 
Administrators can review incoming requests, track their status, and resolve issues directly from an admin dashboard.

---

## Why I Built This

ArtHub was created as a full-stack project to explore how a modern digital marketplace works in practice. The goal was not only to build an attractive user interface 
but also to solve real-world challenges such as authentication, role-based access control, subscription management, secure payments, image hosting, and dynamic data filtering.

The project combines a modern Next.js frontend with an Express and MongoDB backend to create a complete marketplace experience that is scalable, responsive, and user-friendly.

## Future Improvements and upcoming features: 

For the **Future Improvements & Upcoming Features** section, keep the features realistic and achievable while showing that the project can grow.

## Future Improvements & Upcoming Features

1. **ArtHub Community**
   * Create a community forum where artists and collectors can interact, share insights, and discuss art trends.

2. **Artwork Wishlist**
   * Allow collectors to save artworks to a personal wishlist and revisit them later before making a purchase.

3. **Artwork Reviews & Ratings**
   * Enable buyers to leave ratings and reviews on purchased artworks, helping artists build credibility and trust.

4. **Artist Verification Badge**
   * Introduce a verification system for artists to help collectors identify authentic and trusted creators. This will be provided by admin.

5. **Advanced Dashboard Analytics**
   * Provide artists with additional insights such as most viewed artwork, conversion rates, and top-performing categories.

6. **Multiple Artwork Images**
   * Enable artists to upload multiple images for a single artwork, allowing collectors to view details from different angles.

7. **Dark Mode Support**
    * Add a dark theme to improve accessibility and provide a more comfortable browsing experience.

8. **Artist Portfolio Pages**
    * Create dedicated public portfolio pages where artists can showcase all their work, achievements, and sales history.


9. **Email Notifications**
    * Send email updates for purchases, sales, subscription renewals, support ticket updates, and account activity.


# Conclusion
ArtHub is more than just a marketplace; it's a platform designed to empower artists and connect them with collectors in a meaningful way. By focusing on user experience, security, and community-building features, ArtHub aims to create a vibrant ecosystem where creativity can thrive and art lovers can easily discover and collect unique pieces. With ongoing improvements and new features on the horizon, ArtHub is poised to become a go-to destination for artists and collectors alike.

