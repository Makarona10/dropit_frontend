# 💧 DropIt Frontend

DropIt is a modern online storage platform that lets you **store, organize, and share your files** easily and securely.  
You can upload multiple file types, preview media directly in the browser, organize your files into folders, and share them with others.

This repository contains the **frontend** of DropIt — built with **React**, **TypeScript**, and **Tailwind CSS**, providing a clean and responsive user experience.

---

## ✨ Features

- 🔐 **User Authentication**
  - Login via email/password or Google account
- 📂 **File Management**
  - Upload, view, download, and delete files
  - Restore deleted files or delete them permanently
- 🗂️ **Folders**
  - Create and organize files inside folders
- ❤️ **Favorites**
  - Mark files you love and access them quickly
- 🎥 **Media Preview**
  - View images and play videos directly in the browser
- 🔎 **Search & Filters**
  - Instantly find files by name, type, or folder
- 🔗 **File Sharing**
  - Share files with other accounts, granting view access
- 🖥️ **Responsive Design**
  - Fully optimized for desktop and mobile devices

---

## 🧱 Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **API Client:** Axios
- **Routing:** App Router (Next.js 14)
- **Icons:** Lucide React

---

## ⚙️ Folder Structure
src/
┣ app/ # Pages & routes
┣ components/ # Reusable UI components
┣ contexts/ # Global React contexts (auth, files, etc.)
┣ lib/ # Helper libraries & API configurations
┣ utils/ # Utility functions
┣ styles.ts # Global style variables

---

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- Node.js v18+
- npm

### Installation
```bash
git clone https://github.com/yourusername/dropit-frontend.git
cd dropit-frontend
npm install
