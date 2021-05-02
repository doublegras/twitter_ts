window.addEventListener('DOMContentLoaded', () => {
  const imageProfile = document.querySelector('#image-profile')
  const inputAvatar = document.querySelector('#input-avatar');
  const formContainer = document.querySelector('#form-container');

  console.log(document.cookie);

  imageProfile.addEventListener('click', () => {
    inputAvatar.click(); //click() simule un click
  })
  inputAvatar.addEventListener('change', () => {
    formContainer.submit();
  })
})