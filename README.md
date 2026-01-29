# 🏠 Medical-Invest Real Estate Platform

A modern, bilingual (Arabic/German) real estate investment platform built with React and Node.js. Features a beautiful admin dashboard for managing cities, properties, and video content.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?logo=tailwindcss)

## ✨ Features

### 🌐 Public Website
- **Bilingual Support** - Full Arabic (RTL) and German language support
- **City Pages** - Dynamic city information pages with rich content
- **Video Gallery** - Embedded YouTube videos with descriptions
- **Responsive Design** - Mobile-first, works on all devices

### 🔐 Admin Dashboard
- **Modern UI** - Built with shadcn/ui components and smooth animations
- **City Management** - Create, edit, and delete city pages with drag-and-drop ordering
- **Video Management** - Manage YouTube video content
- **Account Settings** - Update profile, change password, reset account
- **Theme Toggle** - Light/Dark mode with persistence
- **Language Switcher** - Switch between Arabic and German in the dashboard

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Motion** (Framer Motion) - Smooth animations
- **@dnd-kit** - Drag and drop functionality
- **i18next** - Internationalization
- **React Router v7** - Client-side routing

### Backend
- **Express 5** - Web framework
- **MongoDB** with Mongoose - Database
- **Cloudinary** - Image hosting
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
investment-site-main/
├── backend/
│   ├── config/         # Database & Cloudinary config
│   ├── middleware/     # Auth middleware
│   ├── models/         # MongoDB models (User, City, Video)
│   ├── routes/         # API routes
│   └── index.js        # Server entry point
│
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable components
│       │   ├── admin/  # Admin-specific components
│       │   └── ui/     # shadcn/ui components
│       ├── contexts/   # React contexts (Auth)
│       ├── i18n/       # Translations (ar.json, de.json)
│       ├── pages/      # Page components
│       │   └── admin/  # Admin pages
│       └── lib/        # Utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Cloudinary account

### Environment Variables

Create `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/investment-site
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Create `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd investment-site-main
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Create Admin User**
   ```bash
   cd backend
   node createAdmin.js
   ```

5. **Seed Sample Data (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
```

**Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Admin Dashboard: `http://localhost:5173/admin/login`

## 🔑 Default Admin Credentials

```
Username: admin
Password: admin123
```

## 📱 Admin Dashboard Features

| Feature | Description |
|---------|-------------|
| 🏙️ **City Editor** | Create and edit city pages with bilingual content, hero images, content sections, and activities |
| 🎬 **Video Manager** | Add and manage YouTube videos with Arabic and German titles |
| 👤 **Account Settings** | Update profile, change password, or reset account |
| 🌓 **Theme Toggle** | Switch between light and dark modes |
| 🌐 **Language Switch** | Toggle between Arabic (RTL) and German (LTR) |

## 🎨 UI Components

The project uses **shadcn/ui** components:
- Button, Input, Label
- Card, Dialog, Sheet
- Table, Tabs
- Avatar, Badge
- Dropdown Menu
- Skeleton (loading states)
- Sonner (toast notifications)

## 🌍 Internationalization

Translations are stored in:
- `frontend/src/i18n/locales/ar.json` - Arabic
- `frontend/src/i18n/locales/de.json` - German

## 📄 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/verify` | Verify JWT token |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/change-password` | Change password |
| PUT | `/api/auth/update-profile` | Update profile |
| POST | `/api/auth/reset-account` | Reset account |

### Cities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cities` | Get all cities |
| GET | `/api/cities/:slug` | Get city by slug |
| POST | `/api/cities` | Create city |
| PUT | `/api/cities/:id` | Update city |
| DELETE | `/api/cities/:id` | Delete city |

### Videos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | Get all videos |
| POST | `/api/videos` | Add video |
| DELETE | `/api/videos/:id` | Delete video |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload image to Cloudinary |

## 🏗️ Building for Production

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`.

## 📝 License

ISC License

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ for Medical-Invest
