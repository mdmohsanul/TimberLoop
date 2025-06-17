# Timber

A full-stack e-commerce application with JWT-based authentication, enabling secure login, product browsing, and order management.
Features include infinite scroll, dynamic cart/wishlist handling, and optimized search with debouncing for a seamless user experience.

---

## Demo Link

[Live Demo](https://timber-weld.vercel.app/)  

---

## Login

> **Guest**  
> Email: `ryan@gmail.com`  
> Password: `Ryan@123`

---

## Quick Start

```
git clone https://github.com/mdmohsanul/TimberLoop.git
cd Timber
npm install
npm run dev 
```

## Technologies
- React JS
- JavScript
- React Router
- Node.js
- Express
- MongoDB
- JWT
- TailwindCSS

## Demo Video
Watch a walkthrough of all major features of this app:
[Loom Video Link](https://www.loom.com/share/74276578afd640bca354ba1b9d02cad7?sid=907f3a7f-6bab-49ac-b0fd-05e6645c0e3a)

## Features


**Home / Product Listing**
- Browse a wide range of timber products in a responsive, infinite-scroll product grid.
- Products are categorized for easier discovery and filtering.

**Cart & Wishlist**
- Add or remove items from your cart and wishlist in real-time.
- Quantity adjustments and instant total updates ensure a smooth shopping experience.

**Orders**
- Place orders securely with integrated Razorpay payment gateway.
- Track order status and view past order history from your profile.

**Search & Filters**
- Optimized debounced search reduces API calls and delivers faster results.
- Filter products based on categories, availability, and other custom tags.

**Authentication**
- Secure JWT-based authentication with support for email/password login.
- Protected routes for managing cart, orders, and user profile settings.

## API Reference

### **GET /api/products**<br>	 
Get all available timber products<br>	 
Sample Response:<br>
```[{ "_id": "prd123", "title": "Teak Wood", "price": 1200, "inStock": true, ... }]```

### **GET /api/products/:productId**<br>	 	
Get details for a specific product<br>		
Sample Response:<br>
```{ "_id": "prd123", "title": "Teak Wood", "description": "...", "price": 1200, ... }```

### **POST /api/signup**<br> 	
Register a new user<br>	
Sample Response:<br>
```{ "userId": "user123", "token": "jwt-token" }```

### **POST /api/login**<br>  	
Login existing user<br> 	 
Sample Response:<br> 
```{ "userId": "user123", "token": "jwt-token" }```

### **POST /api/cart**<br>  	
Add an item to the cart (protected) 
Sample Response:<br> 
```{ "productId": "prd123", "quantity": 2 }```

### **POST /api/order**<br>  	
Place a new order using Razorpay (protected)<br> 	 
Sample Response:<br> 
```{ "items": [{ "productId": "prd123", "quantity": 2 }], "addressId": "addr001" }```


## Contact
For bugs or feature requests, please reach out to mdmohsan2407@gmail.com