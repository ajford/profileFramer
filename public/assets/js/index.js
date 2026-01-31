const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const saveBtn = document.getElementById('saveBtn');
const emptyState = document.getElementById('emptyState');
const templateGrid = document.getElementById('templateGrid');

// State
let userImage = null;
let overlayImage = null;
let currentLayer = 'photo';
let overlayTemplates = [];

let photoState = {
  scale: 1,
  x: 0,
  y: 0
};

let overlayState = {
  scale: 1,
  x: 0,
  y: 0
};

// Canvas setup
const CANVAS_SIZE = 1024;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Load overlay templates from JSON
async function loadOverlayTemplates() {
  try {
    const response = await fetch('assets/overlays/overlays.json');
    const data = await response.json();
    overlayTemplates = data.overlays || [];
    populateTemplateGrid();
  } catch (error) {
    console.error('Error loading overlays:', error);
    // If loading fails, continue with just the "None" option
  }
}

function populateTemplateGrid() {
  overlayTemplates.forEach((template, index) => {
    const btn = document.createElement('button');
    btn.className = 'template-btn';
    btn.dataset.template = template.source;
    btn.dataset.templateName = template.name;

    // Create preview image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = template.source;

    btn.innerHTML = `
                    <span class="icon">
                        <img src="${template.source}" alt="${template.name}" crossorigin="anonymous" />
                    </span>
                    <span class="template-name">${template.name}</span>
                `;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadTemplate(template.source);
    });

    templateGrid.appendChild(btn);
  });
}

// Image upload
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        userImage = img;
        emptyState.style.display = 'none';
        saveBtn.disabled = false;
        render();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Template selection for "None" button
document.querySelector('[data-template="none"]').addEventListener('click', function() {
  document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
  this.classList.add('active');
  loadTemplate('none');
});

// Layer tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLayer = btn.dataset.layer;
    updateSliders();
  });
});

// Sliders
const scaleSlider = document.getElementById('scaleSlider');
const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');
const scaleValue = document.getElementById('scaleValue');
const xValue = document.getElementById('xValue');
const yValue = document.getElementById('yValue');

scaleSlider.addEventListener('input', (e) => {
  getCurrentState().scale = e.target.value / 100;
  scaleValue.textContent = e.target.value + '%';
  render();
});

xSlider.addEventListener('input', (e) => {
  getCurrentState().x = parseInt(e.target.value);
  xValue.textContent = e.target.value;
  render();
});

ySlider.addEventListener('input', (e) => {
  getCurrentState().y = parseInt(e.target.value);
  yValue.textContent = e.target.value;
  render();
});

function getCurrentState() {
  return currentLayer === 'photo' ? photoState : overlayState;
}

function updateSliders() {
  const state = getCurrentState();
  scaleSlider.value = state.scale * 100;
  xSlider.value = state.x;
  ySlider.value = state.y;
  scaleValue.textContent = Math.round(state.scale * 100) + '%';
  xValue.textContent = state.x;
  yValue.textContent = state.y;
}

// Touch/mouse dragging
let isDragging = false;
let startX, startY;

canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('touchstart', startDrag);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('touchmove', drag);
canvas.addEventListener('mouseup', endDrag);
canvas.addEventListener('touchend', endDrag);
canvas.addEventListener('mouseleave', endDrag);

function startDrag(e) {
  if (!userImage) return;
  isDragging = true;
  const pos = getEventPosition(e);
  startX = pos.x;
  startY = pos.y;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  const pos = getEventPosition(e);
  const deltaX = pos.x - startX;
  const deltaY = pos.y - startY;

  const state = getCurrentState();
  state.x += deltaX;
  state.y += deltaY;

  startX = pos.x;
  startY = pos.y;

  updateSliders();
  render();
}

function endDrag() {
  isDragging = false;
}

function getEventPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX, clientY;
  if (e.touches && e.touches[0]) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

// Template loading
function loadTemplate(source) {
  if (source === 'none') {
    overlayImage = null;
    render();
    return;
  }

  // Load external image
  overlayImage = new Image();
  overlayImage.crossOrigin = 'anonymous'; // Enable CORS if needed
  overlayImage.onload = () => render();
  overlayImage.onerror = () => {
    console.error('Error loading overlay image:', source);
    alert('Failed to load overlay template. Please check the image URL.');
  };
  overlayImage.src = source;
}

// Rendering
function render() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (!userImage) return;

  // Draw user image
  ctx.save();
  ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  ctx.translate(photoState.x, photoState.y);
  ctx.scale(photoState.scale, photoState.scale);

  const imgAspect = userImage.width / userImage.height;
  const canvasAspect = 1;
  let drawWidth, drawHeight;

  if (imgAspect > canvasAspect) {
    drawHeight = CANVAS_SIZE;
    drawWidth = drawHeight * imgAspect;
  } else {
    drawWidth = CANVAS_SIZE;
    drawHeight = drawWidth / imgAspect;
  }

  ctx.drawImage(userImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  ctx.restore();

  // Draw overlay
  if (overlayImage && overlayImage.complete) {
    ctx.save();
    ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.translate(overlayState.x, overlayState.y);
    ctx.scale(overlayState.scale, overlayState.scale);

    // Scale overlay to fit canvas
    const overlayAspect = overlayImage.width / overlayImage.height;
    let overlayWidth, overlayHeight;

    if (overlayAspect > 1) {
      overlayWidth = CANVAS_SIZE;
      overlayHeight = CANVAS_SIZE / overlayAspect;
    } else {
      overlayHeight = CANVAS_SIZE;
      overlayWidth = CANVAS_SIZE * overlayAspect;
    }

    ctx.drawImage(overlayImage, -overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
    ctx.restore();
  }
}

// Save
saveBtn.addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile-picture.png';
    a.click();
    URL.revokeObjectURL(url);
  });
});

// Initialize
loadOverlayTemplates();

// Theme toggle functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const htmlElement = document.documentElement;

// Load saved theme preference or default to system
const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    setTheme(theme);
    localStorage.setItem('theme', theme);
  });
});

function setTheme(theme) {
  // Remove active class from all buttons
  themeButtons.forEach(btn => btn.classList.remove('active'));

  // Add active class to selected button
  const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Apply theme
  if (theme === 'system') {
    htmlElement.removeAttribute('data-theme');
  } else {
    htmlElement.setAttribute('data-theme', theme);
  }
}
