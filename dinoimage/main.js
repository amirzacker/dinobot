function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('http://localhost:3000/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('Votre demande a été rejetée en raison de notre système de sécurité.');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
    //for download
    document.querySelector('#download-btn').style.display = 'block';

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}



document.querySelector("#download-btn").addEventListener("click", function() {
  const imageUrl = document.querySelector("#image").src;
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});




document.querySelector('#image-form').addEventListener('submit', onSubmit);