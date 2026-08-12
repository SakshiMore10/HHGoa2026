# 🌴 Hacker House Goa 2026 — #FrameInGoa Generator

A modern, interactive **Builder ID Card & PFP Frame Generator** created for **Hacker House Goa 2026**.

The application allows participants to upload their photo, enter their details, customize their ID card, preview it in real time, generate a unique ID code and QR code, and download the final design as a high-quality image.

---

## ✨ Features

### 🪪 Builder ID Card Generator

* Generate personalized Hacker House Goa 2026 Builder ID Cards.
* Enter:

  * Name
  * Team Name
  * Role
  * Email
  * Phone Number
  * Tech Stack
* Real-time canvas preview.
* Automatically updates the design whenever the user changes their information.

### 🎨 Multiple Templates

The generator currently provides two ID-card layouts:

* **Beach Badge — Vertical**
* **Boarding Pass — Horizontal**

The application also includes a **PFP Frame Overlay** mode.

### 📸 Photo Upload & Customization

Users can:

* Upload JPG, PNG, WEBP or HEIC images.
* Drag and drop a photo.
* Zoom the uploaded image.
* Move the image horizontally.
* Move the image vertically.
* Reset the photo position.

These controls are implemented directly in the browser.

### 🔳 Dynamic QR Code

Each generated card contains a real scannable QR code.

The QR code can include:

* Hacker House Goa 2026
* Unique ID
* Name
* Team
* Role
* Email
* Phone
* Tech Stack
* `#FrameInGoa`

A unique identifier is automatically generated in the format:

```text
HHG26-XXXXXX
```

### 🖼️ HD Canvas Rendering

The ID cards are rendered using the **HTML5 Canvas API**, allowing the application to generate high-resolution graphics.

The vertical Builder ID Card uses a **1000 × 1500** canvas, while the horizontal Boarding Pass uses a **1500 × 800** canvas.

### ⬇️ Export & Sharing

Users can:

* Download the generated card as an HD image.
* Copy the generated image to the clipboard.
* Share the design to X using the `#FrameInGoa` hashtag.

---

## 🎨 Design

The interface follows a tropical Goa-inspired visual system featuring:

* Emerald green background
* Yellow/gold highlights
* Pink accents
* Cyan highlights
* Glassmorphism panels
* Animated loading screen
* Responsive layout
* Gradient borders and glowing effects
* Custom typography

The main design system is defined through CSS variables for colors, typography, spacing, borders and transitions.

---

## 🛠️ Technologies Used

| Technology     | Purpose                              |
| -------------- | ------------------------------------ |
| HTML5          | Application structure                |
| CSS3           | UI, animations and responsive design |
| JavaScript     | Application logic and interactions   |
| HTML5 Canvas   | ID card rendering                    |
| QRCode.js      | QR code generation                   |
| Font Awesome   | Icons                                |
| Google Fonts   | Custom typography                    |
| FileReader API | Client-side image upload             |
| Clipboard API  | Copy generated image                 |

---

## 📁 Project Structure

```text
HH-Goa-2026/
│
├── index.html          # Main application interface
├── style.css           # Design system and responsive styling
├── main.js             # Generator logic and canvas rendering
│
├── card-bg.png         # ID card background artwork
├── title-logo.png      # Hacker House Goa title graphic
│
└── README.md           # Project documentation
```

> Make sure `card-bg.png` and `title-logo.png` are included in the repository because `main.js` loads these assets for the generated card design.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Open the project

```bash
cd YOUR-REPOSITORY
```

### 3. Run the project

Since this is a frontend application, you can open `index.html` directly in a browser.

For a better development experience, use a local server.

For example, with VS Code:

```text
Right Click → Open with Live Server
```

Or with Python:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

## 🧑‍💻 How to Use

### Step 1 — Choose a Mode

Select one of the available modes:

* **Builder ID Card**
* **PFP Frame Overlay**

### Step 2 — Choose a Template

For Builder ID Card mode, select:

* Beach Badge — Vertical
* Boarding Pass — Horizontal

### Step 3 — Upload Your Photo

Upload your image by clicking the upload area or dragging and dropping a file.

### Step 4 — Enter Your Details

Fill in your:

```text
Name
Team Name
Role
Email
Phone Number
Tech Stack
```

### Step 5 — Adjust Your Photo

Use the controls to:

* Zoom
* Move horizontally
* Move vertically

### Step 6 — Preview

The generated design is displayed immediately in the **Live Preview** canvas.

### Step 7 — Generate & Share

Download the final HD image, copy it to your clipboard, or share it to X with:

```text
#FrameInGoa
```

---

## ⚙️ How It Works

The application uses a browser-based state management system to store the user's selected mode, template, uploaded image, photo position, and personal details.

```text
User
  │
  ▼
Upload Photo
  │
  ▼
Enter Personal Details
  │
  ▼
Select Template / Mode
  │
  ▼
Canvas Rendering Engine
  │
  ├── Builder ID Card
  │      ├── Vertical Badge
  │      └── Horizontal Boarding Pass
  │
  └── PFP Frame
  │
  ▼
Generate Unique ID
  │
  ▼
Generate QR Code
  │
  ▼
Live Preview
  │
  ├── Download HD Image
  ├── Copy Image
  └── Share to X
```

The application's JavaScript state tracks the selected mode, template, uploaded image, zoom/pan values and user information.

---

## 🔐 Privacy

The project is designed as a **client-side web application**.

User-uploaded photos and entered information are processed in the browser for generating the graphic. The image upload uses the browser's `FileReader` API to load the selected image.

No backend database or authentication system is required for the basic generator.

---

## 📱 Responsive Design

The interface is designed to work across different screen sizes, with responsive styling for the control panel, preview area, forms and action buttons.

---

## 🎯 Project Purpose

The goal of this project is to provide an easy and visually engaging way for Hacker House Goa 2026 participants to create personalized digital identity cards and profile-picture frames.

Instead of manually designing an ID card, users can enter their information and generate a ready-to-share graphic within seconds.

---

## 🌴 Event

**Hacker House Goa 2026**

📅 **28–31 October 2026**

📍 **Goa, India**

🏷️ **#FrameInGoa**

---

## 👨‍💻 Credits

**247PM STUDIO**

Built for the Hacker House Goa 2026 `#FrameInGoa` experience.

---

## 📄 License

This project is intended for the Hacker House Goa 2026 / #FrameInGoa experience.

If you plan to reuse, redistribute, or commercially deploy the project, please obtain the appropriate permissions from the original project/event organizers.

---

## ⭐ Show Your Build

Generated your Hacker House Goa ID?

Share it and tag:

```text
#FrameInGoa
#HackerHouseGoa
#HackerHouse
```

**Build • Ship • Relax • Repeat 🌴**
