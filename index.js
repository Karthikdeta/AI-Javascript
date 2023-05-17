const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {
  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }

  generateBtn.disabled = true;
  stopBtn.disabled = false;
  resultText.innerText = "Generating...";

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
      }),
    });

    const data = await response.json();
    resultText.innerText = data.choices[0].message.content;
  } catch (error) {
    resultText.innerText = "Error occurred while generating.";
    console.error("Error:", error);
  } finally {
    // Enable the generate button and disable the stop button
    generateBtn.disabled = false;
    stopBtn.disabled = true;
  }
};

generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
