import API from "./API.json"
const OPENAI_API_KEY = API.OPENAI_API_KEY

async function generateImageUrl(prompt) {
    const url = 'https://api.openai.com/v1/images/generations';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };
    const data = {
        'model': 'dall-e-3',
        'prompt': prompt,
        'n': 1,
        'size': '1024x1024',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.data[0].url;
    } catch (error) {
        throw error;
    }
}

// Example usage with async/
const submitButton = document.getElementById('submit')
const textarea = document.getElementById('prompt');
const generatedImage = document.getElementById('generatedImage');


submitButton.addEventListener("click",async() => {
   let promptValue = ''; // Variable to store the textarea value

    promptValue = textarea.value;
    console.log(promptValue)
    let response
    response = await generateImageUrl(promptValue)

    console.log(response)
   generatedImage.src = response;




})