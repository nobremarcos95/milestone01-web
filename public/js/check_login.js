const updateHeader = () => {
  const loggedUser = JSON.parse(sessionStorage.getItem('user'));
  const loginLink = document.querySelector('#login-link');
  const loginText = document.querySelector('#login-text');
  const loginIcon = document.querySelector('#login-icon');

  if (loggedUser) {
    // Usuário logado: exibir "Olá, [Nome]" e mudar funcionalidade do link para deslogar
    loginText.textContent = `Olá, ${loggedUser.name}`;
    loginIcon.style.display = 'none'; // Ocultar o ícone de login
    loginLink.href = '#'; // Impedir redirecionamento para a página de login

    // Adicionar evento de deslogar
    loginLink.onclick = (event) => {
      event.preventDefault();
      // Remover o usuário da sessão
      sessionStorage.removeItem('user');
      alert('Você foi deslogado!');
      // Recarregar a página para atualizar o estado do cabeçalho
      location.reload();
    };
  } else {
    // Usuário não logado: exibir "Entrar" e funcionalidade padrão
    loginText.textContent = 'Entrar';
    loginIcon.style.display = 'inline'; // Mostrar o ícone de login
    loginLink.href = 'login.html'; // Redirecionar para a página de login
  }
};


document.addEventListener('DOMContentLoaded', () => {
  // Atualizar o cabeçalho ao carregar a página
  updateHeader();
});