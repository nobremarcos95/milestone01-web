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
  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    // Login with email and password
    const username = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const isCaptchaChecked = document.querySelector('#recaptcha').checked;

    if (!username || !password) {
      alert("Preencha seus dados de login!");
      return;
    }

    if (!isCaptchaChecked) {
      alert("Você precisa confirmar que não é um robô!");
      return;
    }

    const data = { username, password };
    const promise = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await promise.json();

    if (!result.length) {
      alert('Login não encontrado!');
      return;
    }

    alert("Login realizado com sucesso!");
    sessionStorage.setItem('user', JSON.stringify({ ...data, name: result[0].name }));
    updateHeader();
    window.location.href = 'home.html';
  });
});
