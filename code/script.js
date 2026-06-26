// ==========================================
// 1. GLOBAL DOM NODES SELECTION
// ==========================================
const video = document.getElementById('webcam');
const canvas = document.getElementById('output-canvas');
const ctx = canvas.getContext('2d'); // Accessing 2D rendering surface for canvas processing

const captureBtn = document.getElementById('capture-btn');
const downloadBtn = document.getElementById('download-btn');
const filterButtons = document.querySelectorAll('.filter-rack .filter-btn');

// State tracking variables
let currentFilterString = 'none';

// ==========================================
// 2. CAMERA PERMISSIONS & INITIALIZATION
// ==========================================
async function startWebcam() {
    try {
        // Request hardware permissions to capture video from client device
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }, // standard aspect-ratio bounds target
            audio: false // audio channel redundant for clean photo booth usage
        });
        
        // Pass the live stream track into the source window object element
        video.srcObject = stream;
    } catch (err) {
        console.error("Critical Error: Web Camera access rejected/unavailable.", err);
        alert("Please enable camera access permissions inside your browser settings to run the photobooth layout.");
    }
}

// ==========================================
// 3. SELECTION LOGIC FOR CUSTOM EFFECTS
// ==========================================
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Toggle 'active' styling visually across the filter row interface
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');

        // Extract the raw canvas-native filter code attribute logic
        currentFilterString = e.target.getAttribute('data-filter');

        // Dynamically apply visual filter parameters directly into the live viewport track
        video.style.filter = currentFilterString;
    });
});

// ==========================================
// 4. IMAGE SNAPSHOT SNAP CAPTURE LOGIC
// ==========================================
captureBtn.addEventListener('click', () => {
    // Dynamically match internal canvas resolution tracking boundaries to video feed resolution metrics
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Apply the globally selected filters directly to canvas 2D contexts pipeline
    ctx.filter = currentFilterString;

    // Draw the static video frame directly onto our functional hidden render canvas element
    // Arguments layout: drawImage(source, targetX, targetY, targetWidth, targetHeight)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Re-enable output download button interaction targets once payload exists safely
    downloadBtn.disabled = false;
});

// ==========================================
// 5. PROCESS AUTOMATIC LOCAL IMAGE DOWNLOAD
// ==========================================
downloadBtn.addEventListener('click', () => {
    // Generate an abstract Base64 URL representation string mapping to canvas PNG content
    const imagePayloadURL = canvas.toDataURL('image/png');

    // Create a temporary, programmatic anchor element instance
    const spatialDownloadAnchor = document.createElement('a');
    spatialDownloadAnchor.href = imagePayloadURL;
    
    // Explicit file naming formatting string configurations
    spatialDownloadAnchor.download = `sketchbooth_snapshot_${Date.now()}.png`;

    // Append anchor object manually to register activation inside standard DOM lifecycles
    document.body.appendChild(spatialDownloadAnchor);
    spatialDownloadAnchor.click(); // Trigger implicit programmatic click download sequence
    document.body.removeChild(spatialDownloadAnchor); // Clear detached anchor node instantly
});

// Execute the hardware permissions pipeline right upon initial file runtime
startWebcam();