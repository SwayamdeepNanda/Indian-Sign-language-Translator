// Video Gesture Recognition Elements
const video = document.getElementById('video');
const output = document.getElementById('output');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// Audio Speech Recognition Elements
const speechOutput = document.getElementById('output-bot');
const audioBtn = document.getElementById('audio');
const voiceInputText = document.getElementById('voice-input-text');
const videoImageContainer = document.getElementById('video-image-container');
const stopSpeakingBtn = document.getElementById('stopSpeaking');

let model = null;
let isRecognizingGesture = false;
let isRecognizingSpeech = false;
let recognition = null;
let isCameraAccessible = false;
let isMicrophoneAccessible = false; // Track if microphone access is granted
let isRecognitionStarted = false; // Track if recognition has started
let isVideoPlaying = false;


// Function to load the machine learning model
async function loadModel() {
    console.log("Loading model...");
    setTimeout(() => {
        model = {}; // Simulated loaded model
        console.log("Model loaded.");
    }, 2000);
}

// Start video stream for gesture recognition
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            console.log("Camera access granted.");
            isCameraAccessible = true; // Camera is now accessible
            video.onplaying = () => {
                isVideoPlaying = true;
                console.log("Video is now playing.");
            };
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
            output.innerHTML = "Error accessing the camera.";
            isCameraAccessible = false; // Camera access failed
        });
}

// Function to check microphone access
async function checkMicrophoneAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
        isMicrophoneAccessible = true;
        return true; // Microphone access granted
    } catch (err) {
        console.error("Error accessing the microphone: ", err);
        isMicrophoneAccessible = false;
        return false; // Microphone access denied
    }
}

// Function to start gesture recognition
function startGestureRecognition() {
    if (!model) {
        output.innerHTML = "Model is not loaded yet!";
        alert("Model is not loaded yet! Please wait.");
        return;
    }

    if (!isCameraAccessible || !isVideoPlaying) {
        output.innerHTML = "Camera access is not available or video is not playing!";
        alert("Camera access and playing video are required for gesture recognition!");
        return;
    }

    isRecognizingGesture = true;
    isRecognitionStarted = true; // Recognition has started
    output.innerHTML = "Recognizing gesture...";
    console.log("Gesture recognition started.");
    simulateGestureRecognition(); // Placeholder for actual recognition
}

// Function to stop gesture recognition
function stopGestureRecognition() {
    if (!isRecognitionStarted) {
        alert("Recognition wasn't started yet!");
        return;
    }

    isRecognizingGesture = false;
    isRecognitionStarted = false; // Reset recognition start flag
    output.innerHTML = "Gesture recognition stopped.";
    console.log("Gesture recognition stopped.");
}

// Placeholder function to simulate gesture recognition
function simulateGestureRecognition() {
    if (isRecognizingGesture) {
        setTimeout(() => {
            output.innerHTML = "Recognized Sign: Hello (Translation: Namaste)";
            console.log("Recognized Sign: Hello (Translation: Namaste)");
            if (isRecognizingGesture) simulateGestureRecognition();
        }, 2000);
    }
}

// Start speech recognition (using Web Speech API)
async function startSpeechRecognition() {
    if (!model) {
        speechOutput.innerHTML = "Model is not loaded yet!";
        alert("Model is not loaded yet! Please wait.");
        return;
    }

    // Check for microphone access before starting recognition
    const hasMicAccess = await checkMicrophoneAccess();
    if (!hasMicAccess) {
        alert("Microphone access is required!");
        return;
    }

    if (!recognition) {
        try {
            recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = true;
            recognition.interimResults = true;
            setupSpeechRecognitionEvents();
        } catch (e) {
            console.error("Speech recognition not supported:", e);
            speechOutput.innerHTML = "Speech recognition is not supported in this browser.";
            return;
        }
    }

    recognition.start();
    isRecognizingSpeech = true;
    startVoiceAnimation();
    voiceInputText.innerHTML = "Listening...";
    console.log("Speech recognition started.");
}

// Function to stop speech recognition
function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }
    isRecognizingSpeech = false;
    stopVoiceAnimation();
    voiceInputText.innerHTML = "Speech recognition stopped.";
    console.log("Speech recognition stopped.");
}

// Function to set up speech recognition events
function setupSpeechRecognitionEvents() {
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        speechOutput.innerHTML = `Recognized speech: ${transcript}`;
        console.log("Recognized speech:", transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speechOutput.innerHTML = `Error: ${event.error}`;
    };

    recognition.onend = () => {
        if (isRecognizingSpeech) {
            console.log("Speech recognition ended unexpectedly.");
            stopVoiceAnimation(); // Ensure animation stops if recognition ends unexpectedly
        }
    };
}

// Start voice input animation (three dots)
function startVoiceAnimation() {
    console.log("Starting voice animation");
    videoImageContainer.style.display = 'flex'; // Show animation
    videoImageContainer.innerHTML = `
        <div class="dot-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
}

// Stop voice input animation
function stopVoiceAnimation() {
    console.log("Stopping voice animation");
    videoImageContainer.style.display = 'none'; // Hide animation
}

// Event listeners
startBtn.addEventListener('click', startGestureRecognition);
stopBtn.addEventListener('click', stopGestureRecognition);
audioBtn.addEventListener('click', () => {
    if (isRecognizingSpeech) {
        stopSpeechRecognition();
    } else {
        startSpeechRecognition();
    }
});
stopSpeakingBtn.addEventListener('click', () => {
    stopSpeechRecognition();
    voiceInputText.innerHTML = ""; // Clear the "Listening..." message
});
// Start video stream on page load
startVideo();

// Load the machine learning model on page load
loadModel();






// Function to stop speech recognition
function stopSpeechRecognition() {
    if (recognition) {
        recognition.stop();
    }
    isRecognizingSpeech = false;
    stopVoiceAnimation();
    voiceInputText.innerHTML = "Speech recognition stopped.";
    console.log("Speech recognition stopped.");
}



