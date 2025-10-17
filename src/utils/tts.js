let currentAudio = null;

export const initTTS = () => {
  console.log("TTS initialized (using API)");
};

export const speakText = async (text) => {
  try {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    const response = await fetch('/api/ai/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (data.audioBase64) {
      currentAudio = new Audio('data:audio/mp3;base64,' + data.audioBase64);
      currentAudio.play();
    } else if (data.error) {
      console.error('TTS API error:', data.error);
    }
  } catch (error) {
    console.error('Error sending text to TTS API:', error);
  }
};

export const stopTTS = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  console.log("TTS stop requested (API-based)");
};