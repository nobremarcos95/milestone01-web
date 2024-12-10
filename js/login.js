// Mocking database
const logins = [
  { email: 'teste@test.com', password: 'hello1234', name: 'Teste User' },
];

const checkCredentials = (email, password) => {
  return logins.find(loginData => loginData.email === email
    && loginData.password === password);
};

document.addEventListener('DOMContentLoaded', () => {
  // Atualizar o cabeçalho ao carregar a página
  updateHeader();

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

    const user = checkCredentials(email, password);
    if (user) {
      alert("Login realizado com sucesso!");
      sessionStorage.setItem('user', JSON.stringify(user));
      updateHeader();
      window.location.href = 'home.html'
    } else {
      alert("Login não encontrado!");
    }
  });
});
