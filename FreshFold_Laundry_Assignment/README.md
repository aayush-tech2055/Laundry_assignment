# FreshFold — Laundry Services Web App

Tutedude Assignment 4 — Laundry Services Web App.

## Project structure

```text
FreshFold_Laundry_Assignment/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Included functionality

- Responsive navigation bar
- Home / Services / About Us / Contact Us navigation
- Hero section
- Book a Service Today smooth scrolling
- Achievements section
- Dynamic service list
- Add Item / Remove Item functionality
- Dynamic cart and total amount
- Booking form with validation
- EmailJS booking confirmation integration
- Booking success message
- Quality description section
- Newsletter subscription UI
- Footer with important links and social icons

## EmailJS setup

Open `js/script.js` and replace:

```js
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

with your real EmailJS credentials.

The EmailJS template should support these variables:

- `{{fullName}}`
- `{{email}}`
- `{{phone}}`
- `{{orderDetails}}`
- `{{totalAmount}}`

Then open `index.html` in a browser or deploy the folder to Netlify.

## Netlify

Upload the entire project folder. `index.html` must remain in the project root.
