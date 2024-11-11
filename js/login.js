// Mocking database
const logins = [
  { email: 'teste@test.com', password: 'hello1234' },
];

// Check if email and password are correct
const checkCredentials = (email, password) => {
  return logins.some(loginData => loginData.email === email
    && loginData.password === password);
};

document.addEventListener('DOMContentLoaded', () => {
  // Social login
  const socialLoginButtons = document.querySelectorAll('.social-login button');
  socialLoginButtons.forEach(button => button.addEventListener('click', () => {
    alert('Isso deverá ser implementado em breve :). Faça login com e-mail e senha.');
  }));

  // Login button
  const loginButton = document.querySelector('#login-btn');
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Login with email and password
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const isCaptchaChecked = document.querySelector('#recaptcha').checked;

    if (!email || !password) {
      alert("Preencha seus dados de login!");
      return;
    }

    if (!isCaptchaChecked) {
      alert("Você precisa confirmar que não é um robô!");
      return;
    }
    
    // Check if credentials are valid
    const loginFound = checkCredentials(email, password);
    const homeURL = window.location.href.split('/').slice(0,-1).join('/')+'/home.html';
    if (loginFound) {
      alert("Login realizado com sucesso! Você será redirecionado para a home");
      window.location.replace(homeURL);
    } else {
      alert("Login não encontrado!");
    }
  });
});