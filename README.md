🔒 Project Security Note

This e-commerce project is a static site built with vanilla HTML, CSS, and JavaScript. All product data is sourced from local, pre-built JSON files, and there are no external data sources, APIs, or user-generated content involved.

The only use of sessionStorage is to temporarily store clicked product data, which originates solely from these trusted local files. No user input or external scripts modify this data at any point.

While the use of innerHTML in dynamic page generation is generally flagged by security tools like Snyk for potential XSS risks, in this case it is safe because all injected content is fully controlled by the developer and not user-generated.

✅ No external data
✅ No user input injection
✅ No third-party scripts

Therefore, this project does not have active XSS vulnerabilities in its current state.

⸻


# E-Commerce Project (Coders in hoods project requirements) 



You will be building the website for a furniture store. The mockups have been created by professional web designers and are exactly the type of thing you'll be given in your career as a developer.

The product data is provided in `products.js`.

[Link to mockups](https://www.figma.com/file/P6jTYHEAFjm7Dm6d0E9oMr/E_COM)

## Required pages

- Desktop
    - Main
    - Product Listing Page
    - Product Details Page
- Mobile
    - Main
    - Product Listing Page
    - Product Details Page

## Required functionality

- Color, category and price range filters must update the list of products in real time
- Products can be sorted three ways: Default, Price: highest first, Price: lowest first. Selecting a sort option must update the list of products in real time
- Clicking the "Add to basket" button will update the cart icon in the top right of the page to show the number of products in the cart
- Products in the cart are stored and remembered by the browser using localStorage
- Images on the Product Details Page are in a carousel
