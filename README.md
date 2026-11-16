# Volt Tech Store

A responsive tech store front end built with React, JavaScript, and CSS. It starts with phones and covers computers, audio, gaming, smart home, and accessories. Products load from a local JSON file, so no backend is needed.

Portfolio project. Prices, ratings, and review counts are demo data.

![Volt homepage](./docs/screenshot-home.png)

**Live demo:** add your link after you deploy.

## Features

- [x] Two-row navbar with category links and a working search box
- [x] Search by name, brand, category, or description, with a `Ctrl + K` shortcut
- [x] Home sections: benefits bar, recommended products, trade-in calculator
- [x] Shop page with sort (featured, price, rating, newest)
- [x] Category filter in the URL, like `/shop?category=audio`
- [x] Product detail with option picker, color swatches, and specs table
- [x] Loading, error, and empty states
- [x] Cart with quantity and totals, saved in localStorage
- [x] Price and brand filters, wishlist page, mobile menu

## Tech stack

React 19, JavaScript, plain CSS with variables, React Router, Lucide React, Font Awesome, Vite, ESLint, Prettier.

## Getting started

Needs Node.js 18 or newer.

```bash
git clone https://github.com/Yangggg-Coding/tech-store.git
cd tech-store
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Project structure

```
public/
  products.json        # product data
  images/              # photos
src/
  components/          # layout, home, product, shop, cart
  pages/               # Home, Shop, ProductDetail, Cart, NotFound
  context/             # CartContext
  hooks/               # useProducts
  utils/               # sortProducts, filterProducts
  styles/              # CSS files
  App.jsx  main.jsx  index.css
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/shop` | All products |
| `/shop?category=audio&sort=price-asc` | Filtered and sorted products |
| `/shop?q=sony` | Search results |
| `/product/:id` | Product detail |
| `/cart` | Cart |
| `*` | Not found |

Categories: `phones`, `computers`, `audio`, `gaming`, `smart-home`, `accessories`.

## Data shape

```json
{
  "id": 1,
  "name": "iPhone 18 Pro",
  "brand": "Apple",
  "category": "phones",
  "description": "A20 Pro chip with a variable aperture camera.",
  "price": 1199,
  "originalPrice": null,
  "badge": "New",
  "options": ["256GB", "512GB"],
  "optionPrices": { "256GB": 1199, "512GB": 1399 },
  "finishes": ["#1c1c1e", "#a9c4e0"],
  "specs": { "screen": "6.3 inch OLED", "chip": "A20 Pro" },
  "image": "/images/hero/18pro.jpg",
  "rating": 4.8,
  "reviewCount": 1240,
  "releaseDate": "2026-09-18"
}
```

To add a category, add products with a new `category` value and a navbar link. The Shop page and specs table read each product's own fields, so they need no new code.

## How it works

- `useProducts` fetches the JSON once and returns `products`, `loading`, and `error`.
- Category, search, and sort live in the URL with `useSearchParams`, so links, refresh, and Back keep the same view.
- `Shop` filters by category and search text, sorts the result, then passes it to `ProductGrid`.
- `ProductDetail` reads the id with `useParams` and finds the product.
- Colors and spacing come from CSS variables in `index.css`.

## AI as an assistant

I used an AI assistant (Claude by Anthropic) as a learning aid and pair programmer. I stayed in charge of the design, the code, and every decision.

**What the AI helped with**

- Explaining React concepts: state, props, effects, routing, and custom hooks
- Suggesting the folder structure and the build order
- Drafting some components and CSS from my Figma design
- Reviewing my code and explaining bugs
- Finding sample product names, prices, and specs

**What I did myself**

- Designed the layout in Figma and chose the sections
- Wrote, ran, and tested the code in my own editor
- Fixed errors and connected the pieces
- Checked every change with `npm run lint` and by clicking through the app

**Rules I follow**

1. Ask for steps and hints first, not a full app.
2. Read and understand every line before I keep it.
3. Test each change, then commit small steps.
4. Say so in the README when AI helped.

**Data notice**

Product prices, specs, and dates come from public coverage and may be out of date. Ratings, review counts, and two sale prices are invented for the demo. Brand and product names belong to their owners. This project is not affiliated with any brand.

## Roadmap

1. Cart with `CartContext` and localStorage
2. Price and brand filters
3. Wishlist page and mobile menu
4. Tests for filter and sort functions
5. Deploy to Vercel
6. Backend and login

## Author

Heang Hongyang. GitHub: [Yangggg-Coding](https://github.com/Yangggg-Coding)

## License

MIT. Add a `LICENSE` file before you publish.
