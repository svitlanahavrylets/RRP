# RRP s.r.o. — Website & Admin Panel (v1.0)

> **Note:** This is the first version of the website created for **RRP s.r.o.** Currently, this website is inactive (archived), and its source code is used exclusively to demonstrate web development skills in my portfolio.

---

## 📌 Project Overview

A full-stack web application for **RRP s.r.o.**, featuring a corporate portfolio website, blog, careers section, contact form, and an integrated Admin Panel for content management.

The project is built with the **React + Node.js + MongoDB** tech stack, ensuring fast performance, SEO optimization, and dynamic content management.

---

## ⚙️ Key Features & Pages

* **Corporate Website:**
  * **About Us (`AboutUsPage`):** Overview of the company with a "Submit Application" button that sends client requests directly to the owner's email.
  * **Our Team (`OurTeamPage`):** Presentation of company employees and specialists.
  * **Our Services (`OurServicesPage` / `ServicesItemPage`):** Detailed description of services with an integrated contact request option.
  * **Our Projects (`ProjectsPage`):** Portfolio showcasing completed projects and case studies.
  * **Careers (`CareerPage` / `CareerPositionPage`):** List of active job openings with detailed descriptions.
  * **Blog (`BlogPage` / `BlogPostPage`):** News section for publishing articles and company updates.
  * **Contacts (`ContactPage`):** Contact information and contact form integration.
  * **Legal Pages:** `Privacy Policy` and `Cookie Policy` pages.
  * **Utility Pages:** `404 Not Found` error page and a post-submission Thank You page (`OrderThanksPage`).

* **Admin Panel:**
  * Content management interface for site blocks, services, career openings, and blog articles.
  * Backend communication and database operations via REST API.
  * Rich Text Editor: Integrated TipTap editor for creating and formatting blog posts and article content with ease.

---

## 🛠️ Tech Stack

* **Frontend:** React, JavaScript (ES6+), HTML5, CSS3 / Custom Styles, React Router.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB.
* **Additional:** jQuery (for third-party scripts / cookie banner), Vite/Webpack, REST API.

---

## 📁 Project Structure

```text
RRP/
├── public/                     # Static assets
└── src/                        # Client-side source code
    ├── api/                    # API clients & HTTP request setups
    ├── assets/                 # Images, logos, icons
    ├── components/             # Reusable UI components (Header, Footer, UI)
    ├── data/                   # Mock data or constants
    ├── hooks/                  # Custom React hooks
    ├── page/                   # Application pages
    ├── routes/                 # Router configuration (React Router)
    ├── styles/                 # Global styles and CSS modules
    ├── utils/                  # Helper functions and utilities
    ├── App.css                 # Main app component styles
    ├── App.jsx                 # Main React component
    ├── index.html              # HTML template
    └── main.jsx                # Application entry point
```

---

## 🚀 Local Setup & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v20 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Running backend server](https://github.com/svitlanahavrylets/rrp-back)

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/svitlanahavrylets/RRP.git
   cd RRP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or `http://localhost:3000`).


## 🔗 Related Repositories

Backend Repository: [https://github.com/svitlanahavrylets/rrp-back](https://github.com/svitlanahavrylets/rrp-back)


## 👩‍💻 Author

**Svitlana Havrylets**