let filesToUpload = [];
let imagePreviews = [];

document.getElementById('fileInput').addEventListener('change', function(event) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      filesToUpload.push(file);
      const reader = new FileReader();
      reader.onload = function(e) {
        const text = document.getElementById('dropzone-text');
        text.className = 'hide' //hide dropzone label
        imagePreviews.push(e.target.result);
        updateFilePreview(); //runs the updateFilePreview
      };
      reader.readAsDataURL(file);
    }
  }
});

function updateFilePreview() {
  const filePreview = document.getElementById('filePreview'); //getting an element by id 
  filePreview.innerHTML = '';
  imagePreviews.forEach((preview, index) => { // creates needed UI for every selected image
    const div = document.createElement('div'); //creates a div
    div.className = 'custom-dropzone-preview'; //adds a class name to the div

    const img = document.createElement('img'); // creates an image tag
    img.src = preview;
    div.appendChild(img);

    const overlay = document.createElement('div'); //creates a div
    overlay.className = 'custom-dropzone-overlay'; //adds a class name to the div

    const removeButton = document.createElement('button'); //creates a button
    removeButton.className = 'custom-dropzone-remove'; //adds a class name to the button
    removeButton.innerHTML = 'X'; //adds the text that will display on the button
    removeButton.onclick = function() { //runs the function to remove an image when the cancel button is clicked
      removeImage(index);
    };
    overlay.appendChild(removeButton);

    div.appendChild(overlay);

    filePreview.appendChild(div);
  });
}

function removeImage(index) {// removes the last image from the right
  imagePreviews.splice(index, 1); 
  filesToUpload.splice(index, 1);
  updateFilePreview(); //runs the updatesFile preview function to ensure we see the recent change 
}

function submitForm() {
  // Collect form data
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    preferredDate: document.getElementById('preferredDate').value,
    preferredTime: document.getElementById('preferredTime').value,
    alternateDate: document.getElementById('alternateDate').value,
    alternateTime: document.getElementById('alternateTime').value,
    location: document.getElementById('location').value,
    orderType: document.getElementById('orderType').value,
    additionalNote: document.getElementById('additionalNote').value
  };
  console.log('FormData:', formData )
  // Store the form data in localStorage
  localStorage.setItem('formData', JSON.stringify(formData));

  // Redirect to the confirmation page
  window.location.href = 'appointment-success.html';
}