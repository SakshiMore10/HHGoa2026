🌴 Hacker House Goa 2026 — ID Card & PFP Frame Generator

Create • Customize • Download • ShareA browser-based graphic generator created for Hacker House Goa 2026 and the #FrameInGoa community.

📌 Overview

Hacker House Goa 2026 — ID Card & PFP Frame Generator is a client-side web application that lets participants create personalized event graphics directly in their browser.

Users can upload a profile photo, enter their details, choose a graphic format, adjust their photo, and generate a high-resolution event graphic without needing external image-editing software.

The project uses the HTML5 Canvas API for graphic rendering and QRCode.js for generating real scannable QR codes.

✨ Features

🪪 Builder ID Card

Personalized participant name

Phone number

Email

Role

Technology stack

Profile photo

Automatic participant ID

Scannable QR code

#FrameInGoa branding

🎟️ Boarding Pass

A horizontal Boarding Pass format containing:

Passenger name

Phone

Role & tech stack

Email

QR code

Pass ID

Goa event information

#FrameInGoa branding

🖼️ PFP Frame Overlay

A square profile-picture frame supporting:

Profile photo

Tropical Goa background

Gradient frame

Event branding

#FrameInGoa

Optional team name

📸 Photo Upload

Click to upload

Drag and drop

JPG, PNG, WEBP and other browser-supported formats

🔍 Photo Controls

Zoom

Horizontal pan

Vertical pan

Reset photo position

🔢 Automatic ID Generation

ID cards receive a unique code in the format:

HHG26-XXXXXX

Example:

HHG26-EKP03Q

📱 Real Scannable QR Code

The QR code can contain participant and event information such as:

HACKER HOUSE GOA 2026
ID: HHG26-XXXXXX
Name: Participant Name
Phone: +91XXXXXXXXXX
Role: Software Engineer
Email: example@email.com
Stack: React • Node.js • Python
#FrameInGoa

💾 HD PNG Download

Generated graphics can be downloaded as high-quality PNG files.

Example:

HHGoa2026_Builder_ID_HHG26-XXXXXX.png
HHGoa2026_PFP_Frame.png

📋 Copy Image

Copy the generated graphic directly to the clipboard where browser permissions support image clipboard operations.

𝕏 Share to X

Generate the graphic, download it, and open an X post composer with a pre-filled Hacker House Goa / #FrameInGoa message.

🛠️ Tech Stack

Technology

Purpose

HTML5

Application structure

CSS3

UI, layout and visual styling

JavaScript

Application logic

HTML5 Canvas

Graphic generation

QRCode.js

QR code generation

Google Fonts

Typography

Font Awesome

Icons

FileReader API

Image upload and processing

Clipboard API

Copy generated images

Fonts

Outfit

Space Grotesk

Tiro Devanagari Hindi

🎨 Design

The visual identity follows a Goa tropical / hacker-house aesthetic with:

Deep emerald green backgrounds

Tropical palm and jungle artwork

Neon yellow accents

Green, pink and cyan gradient borders

Hacker House Goa branding

Tropical wooden signpost artwork

Responsive glass-style web UI

Canvas Formats

Format

Canvas Size

Beach Badge / ID Card

1000 × 1500 px

Boarding Pass

1500 × 800 px

PFP Frame

1000 × 1000 px

📁 Project Structure

HH-Goa-2026-ID-Card-Generator/
│
├── index.html
├── style.css
├── main.js
│
├── card-bg.png
├── title-logo.png
├── id_card_poster.png
│
└── README.md

File

Purpose

index.html

Main application interface and input controls

style.css

Website styling and responsive layout

main.js

Canvas rendering, QR generation, photo processing and application logic

card-bg.png

Tropical Goa background

title-logo.png

Hacker House Goa title artwork

id_card_poster.png

Project preview image

README.md

Project documentation

Keep card-bg.png and title-logo.png in the same directory as main.js.

⚙️ Application Flow

                 ┌──────────────────────┐
                 │    Open Generator    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Select Generation    │
                 │       Mode           │
                 └──────────┬───────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
       ┌────────────────┐        ┌────────────────┐
       │  Builder ID    │        │   PFP Frame    │
       │     Card       │        │     Mode       │
       └───────┬────────┘        └───────┬────────┘
               │                         │
               ▼                         ▼
       ┌────────────────┐        ┌────────────────┐
       │ Select Template│        │ Enter Team Name │
       └───────┬────────┘        └───────┬────────┘
               │                         │
               └────────────┬────────────┘
                            ▼
                  ┌──────────────────┐
                  │   Upload Photo   │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Zoom / Pan Photo │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Enter Details    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Canvas Rendering │
                  └────────┬─────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Download      Copy Image    Share to X

🧩 How It Works

The application keeps the current user data in a JavaScript state object containing:

mode
template
userImage
zoom
panX
panY
uniqueCode
name
phone
email
role
stack
team

The rendering engine selects one of three graphic formats:

ID Card
 ├── Beach Badge — Vertical
 └── Boarding Pass — Horizontal

PFP Frame
 └── Square Overlay

The Canvas API renders the selected design using the participant data, uploaded photo, event artwork and QR code.

🔐 Privacy

This is primarily a client-side browser application.

Participant information is used to generate the graphic and QR code in the browser. No backend/database is required for the core generator.

However:

Phone numbers can be embedded into the QR code.

Email addresses can be embedded into the QR code.

Entered information may appear directly on the generated graphic.

Generated images can be shared publicly by the user.

Do not enter sensitive information that you do not want to appear on the generated card or QR code.

🚀 Run Locally

1. Clone the repository

git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

2. Open the project

cd YOUR-REPOSITORY

3. Run the application

Open:

index.html

in a modern browser.

For development, VS Code Live Server or another local static server is recommended.

🌐 Deploy with GitHub Pages

Push the project

git add .
git commit -m "Add Hacker House Goa 2026 generator"
git push origin main

Enable GitHub Pages

Go to:

GitHub Repository
        ↓
Settings
        ↓
Pages
        ↓
Build and deployment
        ↓
Deploy from a branch
        ↓
Branch: main
        ↓
Folder: / (root)
        ↓
Save

GitHub Pages will then provide a public website URL.

🌍 External Resources

The project loads:

Google Fonts

Font Awesome

QRCode.js

through external CDNs.

An internet connection is therefore recommended unless these dependencies are bundled locally.

📱 Browser Compatibility

The project uses modern browser features including:

HTML5 Canvas

FileReader API

Blob

Clipboard API

Data URL generation

Recommended browsers:

Google Chrome

Microsoft Edge

Mozilla Firefox

Safari

Some clipboard features may require browser permissions or a secure context.

🎯 Project Objectives

Provide an easy event ID-card generation experience.

Remove the need for external graphic-design software.

Create consistent Hacker House Goa 2026 branding.

Support multiple graphic formats.

Allow participants to personalize their graphics.

Generate unique participant IDs.

Embed participant information in a scannable QR code.

Make graphics easy to download and share.

Provide a visually engaging Goa-inspired experience.

🔮 Future Scope

More ID card templates

More PFP frame designs

Custom event backgrounds

More QR customization

Additional social sharing options

Offline PWA support

Local font bundling

More export formats

Accessibility improvements

Image compression options

Custom team/event branding

Persistent user preferences

🤝 Contributing

Contributions and improvements are welcome.

git checkout -b feature/new-template
git add .
git commit -m "Add new template"
git push origin feature/new-template

Then create a Pull Request on GitHub.

📄 License

This project is intended for the Hacker House Goa 2026 / #FrameInGoa experience.

Event-specific logos, artwork, branding and other visual assets may belong to their respective owners. Verify permission before redistributing those assets outside the intended project/event use.

🌴 Hacker House Goa 2026

Event: Hacker House Goa 2026Location: Goa, IndiaDates: 28–31 October 2026Hashtag: #FrameInGoa

Build • Ship • Relax • Repeat

Made for builders, hackers and creators coming together in Goa. 🌴🚀

⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub and sharing your generated graphic with:

#FrameInGoa
#HackerHouseGoa
#HackerHouse
