/* ==========================================================================
   HH GOA 2026 (#FrameInGoa) - Main Canvas Generator Logic
   ========================================================================== */

// State Management
const state = {
  mode: 'id-card',          // 'id-card' | 'pfp-frame'
  template: 'vertical',     // 'vertical' (Beach Badge) | 'boarding' (Boarding Pass)
  userImage: null,          // Image object
  zoom: 1.0,
  panX: 0,
  panY: 0,
  uniqueCode: '',           // Generated automatically on Download/Share click
  
  // ID Card Fields
  name: '',
  phone: '',
  email: '',
  role: '',
  stack: '',

  // PFP Frame Field
  team: ''
};

// Canvas Element & Context
let canvas, ctx;
let qrOffscreenDiv = null;

// Custom Generated ID Card Background Image
const cardBgImage = new Image();
cardBgImage.src = 'card-bg.png';
cardBgImage.onload = () => {
  if (typeof renderCanvas === 'function') {
    renderCanvas();
  }
};

// Custom Title Logo Graphic Image
const titleLogoImage = new Image();
titleLogoImage.src = 'title-logo.png?v=3';
titleLogoImage.onload = () => {
  if (typeof renderCanvas === 'function') {
    renderCanvas();
  }
};

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('card-canvas');
  ctx = canvas.getContext('2d');
  
  // Create offscreen container for QRCode rendering
  qrOffscreenDiv = document.createElement('div');
  qrOffscreenDiv.style.display = 'none';
  document.body.appendChild(qrOffscreenDiv);

  // Splash Loader dismiss timer (2.4 seconds)
  initLoader();

  // Setup default placeholder photo
  createDefaultAvatar();
  
  // Bind Input Event Listeners
  bindEvents();
  
  // Initial Canvas Render
  ensureIdCodeGenerated();
  renderCanvas();

  // Re-render when custom web fonts finish downloading
  if (document.fonts) {
    document.fonts.ready.then(() => renderCanvas());
  }
});

// Splash Loader Dismiss Logic
function initLoader() {
  const loader = document.getElementById('loader-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 2400);
  }
}

// Generate Unique Code (e.g. HHG26-EKP03Q)
function generateIdCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HHG26-${rand}`;
}

// Format QR Code Text (scanned directly by mobile camera)
function getFormattedQrText() {
  const info = ["HACKER HOUSE GOA 2026"];
  if (state.uniqueCode) info.push(`ID: ${state.uniqueCode}`);
  if (state.name.trim()) info.push(`Name: ${state.name.trim()}`);
  if (state.team.trim()) info.push(`Team: ${state.team.trim()}`);
  if (state.role.trim()) info.push(`Role: ${state.role.trim()}`);
  if (state.email.trim()) info.push(`Email: ${state.email.trim()}`);
  if (state.phone.trim()) info.push(`Phone: ${state.phone.trim()}`);
  if (state.stack.trim()) info.push(`Stack: ${state.stack.trim()}`);
  info.push("#FrameInGoa");
  return info.join("\n");
}

// Bind Events
function bindEvents() {
  const fields = ['name', 'phone', 'email', 'role', 'stack', 'team'];
  fields.forEach(field => {
    const input = document.getElementById(`input-${field}`);
    if (input) {
      input.addEventListener('input', (e) => {
        state[field] = e.target.value;
        renderCanvas();
      });
    }
  });

  // Photo Upload File Input
  const fileInput = document.getElementById('photo-input');
  fileInput.addEventListener('change', handleImageUpload);

  // Drag & Drop
  const dropZone = document.getElementById('drop-zone');
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadImageFile(e.dataTransfer.files[0]);
    }
  });

  // Sliders
  document.getElementById('zoom-slider').addEventListener('input', (e) => {
    state.zoom = parseFloat(e.target.value);
    renderCanvas();
  });
  document.getElementById('pan-x-slider').addEventListener('input', (e) => {
    state.panX = parseInt(e.target.value, 10);
    renderCanvas();
  });
  document.getElementById('pan-y-slider').addEventListener('input', (e) => {
    state.panY = parseInt(e.target.value, 10);
    renderCanvas();
  });
}

// Handle Image Upload
function handleImageUpload(e) {
  if (e.target.files && e.target.files[0]) {
    loadImageFile(e.target.files[0]);
  }
}

function loadImageFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      state.userImage = img;
      resetPhotoTransform();
      showToast("Photo uploaded successfully!");
      renderCanvas();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Create Clean Default Avatar Placeholder
function createDefaultAvatar() {
  const avatarCanvas = document.createElement('canvas');
  avatarCanvas.width = 400;
  avatarCanvas.height = 400;
  const actx = avatarCanvas.getContext('2d');

  const grad = actx.createLinearGradient(0, 0, 400, 400);
  grad.addColorStop(0, '#0A3B2E');
  grad.addColorStop(1, '#041F18');
  actx.fillStyle = grad;
  actx.fillRect(0, 0, 400, 400);

  actx.fillStyle = 'rgba(255, 230, 0, 0.12)';
  actx.beginPath();
  actx.arc(200, 200, 150, 0, Math.PI * 2);
  actx.fill();

  actx.fillStyle = '#FFE600';
  actx.beginPath();
  actx.arc(200, 145, 55, 0, Math.PI * 2);
  actx.fill();

  actx.beginPath();
  actx.arc(200, 340, 115, Math.PI, 0, true);
  actx.fill();

  const defaultImg = new Image();
  defaultImg.onload = () => {
    state.userImage = defaultImg;
    renderCanvas();
  };
  defaultImg.src = avatarCanvas.toDataURL();
}

// Reset Photo Transforms
function resetPhotoTransform() {
  state.zoom = 1.0;
  state.panX = 0;
  state.panY = 0;
  document.getElementById('zoom-slider').value = 1.0;
  document.getElementById('pan-x-slider').value = 0;
  document.getElementById('pan-y-slider').value = 0;
  renderCanvas();
}

// Mode & Template Switchers
function switchMode(mode) {
  state.mode = mode;
  document.getElementById('tab-id-card').classList.toggle('active', mode === 'id-card');
  document.getElementById('tab-pfp-frame').classList.toggle('active', mode === 'pfp-frame');
  
  const tmplContainer = document.getElementById('template-selector-container');
  tmplContainer.style.display = (mode === 'id-card') ? 'block' : 'none';

  const idFields = ['name', 'team', 'role', 'email', 'phone', 'stack'];
  const isPfp = (mode === 'pfp-frame');

  idFields.forEach(f => {
    const group = document.getElementById(`group-${f}`);
    if (group) {
      if (isPfp) {
        group.style.display = (f === 'team') ? 'flex' : 'none';
      } else {
        group.style.display = 'flex';
      }
    }
  });

  renderCanvas();
}

function setTemplate(template) {
  state.template = template;
  document.getElementById('btn-tmpl-vertical').classList.toggle('active', template === 'vertical');
  document.getElementById('btn-tmpl-boarding').classList.toggle('active', template === 'boarding');
  renderCanvas();
}

// Quick Helper Functions for Inputs
function setRole(roleName) {
  state.role = roleName;
  document.getElementById('input-role').value = roleName;
  renderCanvas();
}

function addStack(tech) {
  if (!state.stack.includes(tech)) {
    state.stack = state.stack ? `${state.stack} • ${tech}` : tech;
    document.getElementById('input-stack').value = state.stack;
    renderCanvas();
  }
}

/* ==========================================================================
   CANVAS RENDERING ENGINE
   ========================================================================== */

function renderCanvas() {
  if (!canvas || !ctx) return;
  ensureIdCodeGenerated();

  if (state.mode === 'pfp-frame') {
    renderPfpFrameTemplate();
  } else {
    if (state.template === 'vertical') {
      renderBeachBadgeVerticalTemplate();
    } else {
      renderBoardingPassHorizontalTemplate();
    }
  }
}

/* --------------------------------------------------------------------------
   TEMPLATE 1: Beach Badge (Vertical ID Card - 1000 x 1500)
   -------------------------------------------------------------------------- */
function renderBeachBadgeVerticalTemplate() {
  canvas.width = 1000;
  canvas.height = 1500;

  // Outer Border: Stylish Rounded Multi-Layer Frame
  ctx.save();
  // Outer Gradient Frame (28px Rounded Corners)
  const frameGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  frameGrad.addColorStop(0, '#FFE600');
  frameGrad.addColorStop(0.35, '#00E676');
  frameGrad.addColorStop(0.7, '#FF1493');
  frameGrad.addColorStop(1, '#00E5FF');
  
  ctx.fillStyle = frameGrad;
  roundRect(ctx, 0, 0, canvas.width, canvas.height, 28, true, false);

  // Inner Clip for Background Image & Outer Bezel (14px inset)
  ctx.fillStyle = '#04140F';
  roundRect(ctx, 14, 14, canvas.width - 28, canvas.height - 28, 20, true, false);

  // Custom Background Image (replacing old gradient & palms)
  ctx.save();
  roundRect(ctx, 14, 14, canvas.width - 28, canvas.height - 28, 20, false, false);
  ctx.clip();
  if (cardBgImage && cardBgImage.complete && cardBgImage.naturalWidth !== 0) {
    ctx.filter = 'brightness(0.92) contrast(1.05)';
    ctx.drawImage(cardBgImage, 14, 14, canvas.width - 28, canvas.height - 28);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(14, 14, canvas.width - 28, canvas.height - 28);
    ctx.filter = 'none';
  } else {
    // Fallback Background Green
    const bgGrad = ctx.createLinearGradient(0, 40, 0, canvas.height - 40);
    bgGrad.addColorStop(0, '#062B21');
    bgGrad.addColorStop(0.5, '#093B2E');
    bgGrad.addColorStop(1, '#041F18');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(14, 14, canvas.width - 28, canvas.height - 28);
    drawPalmBackground(14, 14, canvas.width - 28, canvas.height - 28);
  }
  ctx.restore();

  // Inner Subtle Golden Bezel Line
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.4)';
  ctx.lineWidth = 2;
  roundRect(ctx, 22, 22, canvas.width - 44, canvas.height - 44, 16, false, true);
  ctx.restore();

  // Top Location Header (Positioned cleanly at Y=54 above the title logo)
  ctx.save();
  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 22px "Sitka Text", "Sitka", "Lora", serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 8;
  ctx.fillText('GOA, INDIA  •  28 - 31 OCT 2026', 500, 54);
  ctx.restore();


  // Title: Custom Title Graphic Image (HACKER गोवा HOUSE) - Positioned cleanly below location header
  if (titleLogoImage && titleLogoImage.complete && titleLogoImage.naturalWidth !== 0) {
    const aspect = titleLogoImage.naturalWidth / titleLogoImage.naturalHeight;
    const titleH = 185;
    const titleW = titleH * aspect;
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.drawImage(titleLogoImage, 500 - titleW / 2, 90, titleW, titleH);
    ctx.restore();
  } else {
    // Fallback text rendering
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    
    ctx.font = '900 68px Outfit, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    const hackerWidth = ctx.measureText('HACKER ').width;
    
    ctx.font = 'bold 64px "Tiro Devanagari Hindi", serif';
    const goaWidth = ctx.measureText('गोवा ').width;

    ctx.font = '900 68px Outfit, sans-serif';
    const houseWidth = ctx.measureText('HOUSE').width;

    const totalTitleWidth = hackerWidth + goaWidth + houseWidth;
    let startX = 500 - (totalTitleWidth / 2);

    ctx.textAlign = 'left';
    ctx.font = '900 68px Outfit, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('HACKER ', startX, 185);
    startX += hackerWidth;

    ctx.font = 'bold 64px "Tiro Devanagari Hindi", serif';
    ctx.fillStyle = '#FF1493';
    ctx.shadowColor = 'rgba(255, 20, 147, 0.8)';
    ctx.shadowBlur = 15;
    ctx.fillText('गोवा ', startX, 185);
    ctx.shadowBlur = 0;
    startX += goaWidth;

    ctx.font = '900 68px Outfit, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('HOUSE', startX, 185);
  }

  // Photo Section (Positioned cleanly below title logo)
  const photoW = 390;
  const photoH = 390;
  const photoCenterX = 500;
  const photoCenterY = 485;
  const photoX = photoCenterX - photoW / 2; // 305
  const photoY = photoCenterY - photoH / 2; // 290
  const photoRadius = 24; // Smooth rounded corners matching outer card frame

  // Layer 1: Outer Multi-Color Glow & Gradient Frame
  ctx.save();
  ctx.shadowColor = '#00E676';
  ctx.shadowBlur = 25;

  const photoFrameGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoFrameGrad.addColorStop(0, '#FFE600');
  photoFrameGrad.addColorStop(0.35, '#00E676');
  photoFrameGrad.addColorStop(0.7, '#FF1493');
  photoFrameGrad.addColorStop(1, '#00E5FF');

  ctx.fillStyle = photoFrameGrad;
  roundRect(ctx, photoX - 10, photoY - 10, photoW + 20, photoH + 20, photoRadius + 6, true, false);
  ctx.restore();

  // Layer 2: Inner Dark Inset Bezel Box with Gold Outline
  ctx.save();
  ctx.fillStyle = '#04140F';
  roundRect(ctx, photoX - 3, photoY - 3, photoW + 6, photoH + 6, photoRadius + 2, true, false);

  ctx.strokeStyle = 'rgba(255, 230, 0, 0.6)';
  ctx.lineWidth = 2;
  roundRect(ctx, photoX - 3, photoY - 3, photoW + 6, photoH + 6, photoRadius + 2, false, true);
  ctx.restore();

  // Layer 3: Draw User Photo clipped inside Rounded Square
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius, false, false);
  ctx.clip();

  ctx.fillStyle = '#062B21';
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (state.userImage) {
    drawTransformedImage(ctx, state.userImage, photoCenterX, photoCenterY, photoW, photoH);
  }
  ctx.restore();

  // Name Header
  if (state.name.trim()) {
    ctx.textAlign = 'center';
    ctx.font = '900 56px "Sitka Text", "Sitka", "Lora", serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 12;
    ctx.fillText(state.name.trim().toUpperCase(), 500, 735);
    ctx.shadowBlur = 0;
  }

  // Role Subtitle
  if (state.role.trim()) {
    ctx.font = 'bold 30px "Sitka Text", "Sitka", "Lora", serif';
    ctx.fillStyle = '#FFE600';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 10;
    ctx.textAlign = 'center';
    ctx.fillText(state.role.trim(), 500, 775);
    ctx.shadowBlur = 0;
  }

  // Details Grid Contents (Clean single-column layout)
  const gridY = 795;
  const labelsX = 95;
  const valuesX = 265;
  const maxValueW = 640;

  let currentY = gridY + 24;
  const lineGap = 42;

  // Row 1: TEAM NAME
  drawFieldKey(labelsX, currentY, 'TEAM');
  drawFieldValue(valuesX, currentY, state.team, maxValueW);

  // Row 2: ROLE
  currentY += lineGap;
  drawFieldKey(labelsX, currentY, 'ROLE');
  drawFieldValue(valuesX, currentY, state.role, maxValueW);

  // Row 3: EMAIL
  currentY += lineGap;
  drawFieldKey(labelsX, currentY, 'EMAIL');
  drawFieldValue(valuesX, currentY, state.email, maxValueW);

  // Row 4: PHONE NO.
  currentY += lineGap;
  drawFieldKey(labelsX, currentY, 'PHONE NO.');
  drawFieldValue(valuesX, currentY, state.phone, maxValueW);

  // Row 5: TECH STACK (Below Phone Number at last)
  currentY += lineGap;
  drawFieldKey(labelsX, currentY, 'STACK');
  drawFieldValue(valuesX, currentY, state.stack, maxValueW, '#FFE600');

  // Centered Green Pill Badge for ID Code (Aligned at center X = 500)
  if (state.uniqueCode) {
    const pillY = 1065;
    drawGreenIdPill(500, pillY, `ID: ${state.uniqueCode}`);
  }

  // Real Scannable QR Code centered at the bottom (cx = 500, cy = 1270)
  drawRealScannableQRCode(500, 1270, 185);

  // #FrameInGoa High-Visibility Pill Frame Badge on the left side of the QR code
  ctx.save();
  const hashtagFrameX = 215;
  const hashtagFrameY = 1270;
  const hW = 280;
  const hH = 58;
  const hX = hashtagFrameX - hW / 2;
  const hY = hashtagFrameY - hH / 2;

  ctx.shadowColor = '#FFE600';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#062B21';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3.5;
  roundRect(ctx, hX, hY, hW, hH, 29, true, true);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 26px "Sitka Text", "Sitka", "Lora", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', hashtagFrameX, hashtagFrameY);
  ctx.restore();


  // Bottom Footer
  ctx.fillStyle = '#03140F';
  ctx.fillRect(35, 1435, canvas.width - 70, 30);
  ctx.fillStyle = '#FFE600';
  ctx.font = 'bold 18px "Sitka Text", "Sitka", "Lora", serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌐 www.hhgoa.com   •   ✉️ 247pmstudio@gmail.com   •   #FrameInGoa', 500, 1456);
}

/* --------------------------------------------------------------------------
   TEMPLATE 2: Boarding Pass (Horizontal Ticket Stub - 1500 x 800)
   -------------------------------------------------------------------------- */
function renderBoardingPassHorizontalTemplate() {
  canvas.width = 1500;
  canvas.height = 800;

  // Left Pass Background Image
  if (cardBgImage && cardBgImage.complete && cardBgImage.naturalWidth !== 0) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 520, canvas.height);
    ctx.clip();
    ctx.filter = 'brightness(0.92) contrast(1.05)';
    ctx.drawImage(cardBgImage, 0, 0, 520, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, 520, canvas.height);
    ctx.filter = 'none';
    ctx.restore();
  } else {
    ctx.fillStyle = '#062B21';
    ctx.fillRect(0, 0, 520, canvas.height);
    drawPalmBackground(0, 0, 520, 800);
  }

  // Perforated Line
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(520, 0);
  ctx.lineTo(520, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Right Cream Ticket Stub
  ctx.fillStyle = '#F4EFE0';
  ctx.fillRect(520, 0, 980, canvas.height);

  // Punch holes
  ctx.fillStyle = '#04140F';
  for (let x = 560; x < 1480; x += 70) {
    ctx.beginPath();
    ctx.arc(x, 15, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  const photoCenterX = 260;
  const photoCenterY = 330;
  const photoRadius = 170;

  // Layer 1: Outer Multi-Color Glow & Gradient Frame Ring (Matching ID Card Frame style)
  ctx.save();
  ctx.shadowColor = '#00E676';
  ctx.shadowBlur = 20;

  const bpRingGrad = ctx.createLinearGradient(photoCenterX - photoRadius, photoCenterY - photoRadius, photoCenterX + photoRadius, photoCenterY + photoRadius);
  bpRingGrad.addColorStop(0, '#FFE600');
  bpRingGrad.addColorStop(0.35, '#00E676');
  bpRingGrad.addColorStop(0.7, '#FF1493');
  bpRingGrad.addColorStop(1, '#00E5FF');

  ctx.strokeStyle = bpRingGrad;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Layer 2: Inner Gold Bezel Ring
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius + 1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCenterX, photoCenterY, photoRadius, 0, Math.PI * 2);
  ctx.clip();
  if (state.userImage) {
    drawTransformedImage(ctx, state.userImage, photoCenterX, photoCenterY, photoRadius * 2, photoRadius * 2);
  }
  ctx.restore();

  if (state.name.trim()) {
    ctx.textAlign = 'center';
    ctx.font = '900 44px "Sitka Text", "Sitka", "Lora", serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(state.name.trim().toUpperCase(), 260, 570);
  }

  if (state.role.trim()) {
    ctx.font = 'bold 26px "Sitka Text", "Sitka", "Lora", serif';
    ctx.fillStyle = '#FF1493';
    ctx.textAlign = 'center';
    ctx.fillText(state.role.trim(), 260, 615);
  }

  ctx.fillStyle = '#FFE600';
  ctx.fillRect(0, 720, 520, 80);
  ctx.fillStyle = '#062B21';
  ctx.font = '900 28px "Sitka Text", "Sitka", "Lora", serif';
  ctx.textAlign = 'center';
  ctx.fillText('BOARDING PASS • 2026', 260, 770);

  // --- RIGHT SECTION ---
  ctx.textAlign = 'left';
  ctx.font = '900 50px "Sitka Text", "Sitka", "Lora", serif';
  ctx.fillStyle = '#062B21';
  const hackerHouseText = 'HACKER HOUSE ';
  ctx.fillText(hackerHouseText, 560, 110);
  const hhWidth = ctx.measureText(hackerHouseText).width;

  ctx.font = 'bold 46px "Tiro Devanagari Hindi", serif';
  ctx.fillStyle = '#FF1493';
  ctx.fillText('गोवा', 560 + hhWidth, 110);

  ctx.fillStyle = '#062B21';
  ctx.font = 'bold 20px "Sitka Text", "Sitka", "Lora", serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('FLIGHT HH2026   +   DESTINATION: GOA (GOI)   +   OCT 28-31', 560, 160);

  ctx.strokeStyle = '#062B21';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(560, 180);
  ctx.lineTo(1440, 180);
  ctx.stroke();

  const startX1 = 560;
  const startX2 = 1040;
  let stubY = 240;

  drawTicketLabel(startX1, stubY, 'PASSENGER');
  drawTicketValue(startX1, stubY + 32, state.name);

  drawTicketLabel(startX2, stubY, 'TEAM NAME');
  drawTicketValue(startX2, stubY + 32, state.team, 440);

  stubY += 105;
  drawTicketLabel(startX1, stubY, 'ROLE');
  drawTicketValue(startX1, stubY + 32, state.role, 440);

  drawTicketLabel(startX2, stubY, 'EMAIL');
  drawTicketValue(startX2, stubY + 32, state.email, 240);

  stubY += 105;
  drawTicketLabel(startX1, stubY, 'PHONE NUMBER');
  drawTicketValue(startX1, stubY + 32, state.phone, 440);

  drawTicketLabel(startX2, stubY, 'TECH STACK');
  drawTicketValue(startX2, stubY + 32, state.stack, 240, '#FF1493');

  // Real Scannable QR Code on Boarding Pass
  drawRealScannableQRCode(1320, 600, 180);

  // #FrameInGoa High-Visibility Badge Frame on Boarding Pass
  ctx.save();
  const bpBadgeX = 1060;
  const bpBadgeY = 600;
  const bpW = 250;
  const bpH = 52;
  ctx.fillStyle = '#062B21';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3;
  roundRect(ctx, bpBadgeX - bpW / 2, bpBadgeY - bpH / 2, bpW, bpH, 26, true, true);

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 24px Space Grotesk, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', bpBadgeX, bpBadgeY);
  ctx.restore();

  ctx.fillStyle = '#062B21';
  ctx.font = 'bold 16px Space Grotesk, monospace';
  ctx.textAlign = 'left';
  const passIdText = state.uniqueCode ? `PASS ID: ${state.uniqueCode}   •   ` : '';
  ctx.fillText(`${passIdText}BOARDING: OCT 28, 2026`, 560, 700);

  ctx.fillStyle = '#062B21';
  ctx.fillRect(520, 735, 980, 65);

  ctx.fillStyle = '#FFE600';
  ctx.font = '900 24px Space Grotesk, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('#FrameInGoa   •   hhgoa.com', 1010, 775);
}

/* --------------------------------------------------------------------------
   FORMAT A: PFP Frame / Overlay Mode (1000 x 1000 Square)
   -------------------------------------------------------------------------- */
function renderPfpFrameTemplate() {
  canvas.width = 1000;
  canvas.height = 1000;

  // Custom Background Image
  if (cardBgImage && cardBgImage.complete && cardBgImage.naturalWidth !== 0) {
    ctx.filter = 'brightness(0.92) contrast(1.05)';
    ctx.drawImage(cardBgImage, 0, 0, 1000, 1000);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.filter = 'none';

    // Mirrored copy of left-side palm foliage onto bottom-right corner to replace signpost naturally
    ctx.save();
    ctx.beginPath();
    ctx.rect(550, 480, 450, 520);
    ctx.clip();

    ctx.translate(1000, 0);
    ctx.scale(-1, 1);
    ctx.filter = 'brightness(0.92) contrast(1.05)';
    ctx.drawImage(cardBgImage, 0, 0, 1000, 1000);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.filter = 'none';
    ctx.restore();
  } else {
    ctx.fillStyle = '#04140F';
    ctx.fillRect(0, 0, 1000, 1000);
  }

  const circleRadius = 380; // Made smaller as requested

  // Layer 1: Outer Multi-Color Glow & Gradient Frame Ring (Matching ID Card Frame style)
  ctx.save();
  ctx.shadowColor = '#00E676';
  ctx.shadowBlur = 25;

  const ringGrad = ctx.createLinearGradient(500 - circleRadius, 500 - circleRadius, 500 + circleRadius, 500 + circleRadius);
  ringGrad.addColorStop(0, '#FFE600');
  ringGrad.addColorStop(0.35, '#00E676');
  ringGrad.addColorStop(0.7, '#FF1493');
  ringGrad.addColorStop(1, '#00E5FF');

  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(500, 500, circleRadius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Layer 2: Inner Gold Bezel Ring
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.8)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(500, 500, circleRadius + 1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Layer 3: Draw User Photo clipped inside circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(500, 500, circleRadius, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = '#062B21';
  ctx.fillRect(500 - circleRadius, 500 - circleRadius, circleRadius * 2, circleRadius * 2);

  if (state.userImage) {
    drawTransformedImage(ctx, state.userImage, 500, 500, circleRadius * 2, circleRadius * 2);
  }
  ctx.restore();

  // Curved Header Text along top inner curve of circle in BLACK (#000000)
  drawCurvedText('HACKER HOUSE GOA 2026', 500, 500, circleRadius - 35, -Math.PI / 2, '#000000');

  // Bottom Tagline Badge
  drawPfpBadge(500, 860, '#FrameInGoa', state.team);
}

/* ==========================================================================
   REAL SCANNABLE QR CODE ENGINE (100% Camera Scannable)
   ========================================================================== */

function drawRealScannableQRCode(cx, cy, size = 180) {
  if (!qrOffscreenDiv) return;
  
  const textData = getFormattedQrText();
  qrOffscreenDiv.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(qrOffscreenDiv, {
        text: textData,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#FFFDE7",
        correctLevel : QRCode.CorrectLevel.M
      });

      const qrCanvas = qrOffscreenDiv.querySelector('canvas');
      if (qrCanvas) {
        ctx.save();
        ctx.fillStyle = '#FFFDE7';
        ctx.strokeStyle = '#FFE600';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 14;
        roundRect(ctx, cx - size / 2 - 14, cy - size / 2 - 14, size + 28, size + 28, 16, true, true);
        ctx.shadowBlur = 0;
        ctx.drawImage(qrCanvas, cx - size / 2, cy - size / 2, size, size);
        ctx.restore();
      }
    } catch (e) {
      console.warn("QR Code render error:", e);
    }
  }
}

/* ==========================================================================
   CANVAS HELPER DRAWING FUNCTIONS
   ========================================================================== */

function drawTransformedImage(context, img, cx, cy, targetW, targetH) {
  context.save();
  context.translate(cx + state.panX, cy + state.panY);
  context.scale(state.zoom, state.zoom);

  const imgRatio = img.width / img.height;
  let drawW = targetW;
  let drawH = targetH;

  if (imgRatio > 1) {
    drawW = targetH * imgRatio;
  } else {
    drawH = targetW / imgRatio;
  }

  context.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  context.restore();
}

function drawPalmBackground(x, y, w, h) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 230, 118, 0.04)';
  for (let i = 0; i < 8; i++) {
    const px = x + Math.random() * w;
    const py = y + Math.random() * h;
    ctx.beginPath();
    ctx.arc(px, py, 140, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawTaglinePill(x, y, w, h, text) {
  ctx.save();
  // Vibrant Tropical Yellow Pill Badge with Dark Outline
  ctx.fillStyle = '#FFE600';
  ctx.strokeStyle = '#062B21';
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, h / 2, true, true);
  
  // Clean Dark Emerald Text, Perfectly Centered Vertically & Horizontally
  ctx.fillStyle = '#062B21';
  ctx.font = '900 28px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2);
  ctx.restore();
}

function drawBadgeStamp(text, bgColor) {
  ctx.fillStyle = bgColor;
  roundRect(ctx, -100, -20, 200, 40, 8, true, false);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 18px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 0, 6);
}

function drawFieldKey(x, y, label) {
  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = 'bold 22px "Sitka Text", "Sitka", "Lora", serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#FFE600';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 8;
  ctx.fillText(label, x, y);
  ctx.restore();
}

function drawFieldValue(x, y, val, maxW = 320, color = '#FFFFFF') {
  if (!val || !val.toString().trim()) return;

  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = '600 24px "Outfit", "Space Grotesk", sans-serif';
  ctx.fillStyle = color;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 8;
  
  let txt = val.toString().trim();
  if (maxW && ctx.measureText(txt).width > maxW) {
    while (txt.length > 4 && ctx.measureText(txt + '...').width > maxW) {
      txt = txt.slice(0, -1);
    }
    txt += '...';
  }
  ctx.fillText(txt, x, y);
  ctx.restore();
}

function drawGreenIdPill(cx, cy, text) {
  ctx.fillStyle = '#062B21';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 3;
  roundRect(ctx, cx - 180, cy - 25, 360, 50, 25, true, true);
  ctx.fillStyle = '#FFE600';
  ctx.font = '700 24px "Space Grotesk", "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, cx, cy + 8);
}

function drawTicketLabel(x, y, text) {
  ctx.textAlign = 'left';
  ctx.font = 'bold 16px "Sitka Text", "Sitka", "Lora", serif';
  ctx.fillStyle = '#6B7A74';
  ctx.fillText(text, x, y);
}

function drawTicketValue(x, y, text, maxW = 380, color = '#062B21') {
  if (!text || !text.toString().trim()) return;

  ctx.textAlign = 'left';
  ctx.font = '700 24px "Space Grotesk", "Outfit", sans-serif';
  ctx.fillStyle = color;

  let txt = text.toString().trim();
  if (maxW && ctx.measureText(txt).width > maxW) {
    while (txt.length > 4 && ctx.measureText(txt + '...').width > maxW) {
      txt = txt.slice(0, -1);
    }
    txt += '...';
  }
  ctx.fillText(txt, x, y);
}

function drawCurvedText(text, cx, cy, radius, startAngle, color) {
  ctx.save();
  ctx.font = '900 36px Outfit, sans-serif';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';

  const totalAngle = Math.PI * 0.8;
  const angleStep = totalAngle / text.length;
  let angle = startAngle - (totalAngle / 2);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    ctx.save();
    ctx.translate(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    angle += angleStep;
  }
  ctx.restore();
}

function drawPfpBadge(cx, cy, hashtagText, teamName = '') {
  ctx.fillStyle = '#FF1493';
  ctx.shadowColor = 'rgba(255, 20, 147, 0.6)';
  ctx.shadowBlur = 20;
  
  const badgeW = 460;
  const badgeH = teamName.trim() ? 85 : 70;
  roundRect(ctx, cx - badgeW / 2, cy - badgeH / 2, badgeW, badgeH, 35, true, false);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';

  if (teamName.trim()) {
    ctx.font = '900 26px Outfit, sans-serif';
    ctx.fillText(`🌴 ${hashtagText} 🌴`, cx, cy - 10);
    ctx.fillStyle = '#FFE600';
    ctx.font = 'bold 22px "Sitka Text", "Sitka", "Lora", serif';
    ctx.fillText(`TEAM: ${teamName.trim().toUpperCase()}`, cx, cy + 22);
  } else {
    ctx.font = '900 32px Outfit, sans-serif';
    ctx.fillText(`🌴 ${hashtagText} 🌴`, cx, cy + 10);
  }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

/* ==========================================================================
   AUTOMATIC ID CODE GENERATION ON DOWNLOAD & SHARE
   ========================================================================== */

function ensureIdCodeGenerated() {
  if (state.mode === 'id-card' && !state.uniqueCode) {
    state.uniqueCode = generateIdCode();
  }
}

// Download HD Image
function downloadGraphic() {
  ensureIdCodeGenerated();
  renderCanvas();

  setTimeout(() => {
    const link = document.createElement('a');
    const filename = (state.mode === 'pfp-frame') ? 'HHGoa2026_PFP_Frame.png' : `HHGoa2026_Builder_ID_${state.uniqueCode}.png`;
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    showToast(state.mode === 'pfp-frame' ? "Downloaded PFP Frame!" : `Generated ID Code: ${state.uniqueCode}! Downloading...`);
  }, 100);
}

// Copy Image to Clipboard
async function copyImageToClipboard() {
  ensureIdCodeGenerated();
  renderCanvas();
  
  setTimeout(async () => {
    try {
      canvas.toBlob(async (blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        showToast("Copied image to clipboard!");
      });
    } catch (err) {
      downloadGraphic();
    }
  }, 100);
}

// Share to X (Twitter) Flow
function shareToX() {
  ensureIdCodeGenerated();
  downloadGraphic();

  const extraTeam = state.team.trim() ? `\nTeam: ${state.team.trim()}` : '';
  const tweetText = `Just created my official graphic for Hacker House Goa 2026! 🌴🚀${extraTeam}\nExcited to build with the best at #FrameInGoa 🔥\n\nCheck out HH Goa: https://www.hhgoa.com`;
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  
  setTimeout(() => {
    window.open(intentUrl, '_blank');
  }, 600);

  showToast("Opening X! Attach your generated graphic to your post.");
}

// Toast Notification Helper
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
