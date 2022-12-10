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
      console.log(1);
      const response = await fetch('/openai/generateimage', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
      console.log(2);
      if (!response.ok) {
        console.log(3);
        removeSpinner();
        throw new Error('That image could not be generated');
      }
      console.log(4);
      const data = await response.json();
      console.log(data);
  
      const imageUrl = data.data;
      console.log(imageUrl);
      document.querySelector('#image').src = imageUrl;
  
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
  
  document.querySelector('#image-form').addEventListener('submit', onSubmit);