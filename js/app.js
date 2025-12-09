
/* C&C - Clase & Cita
   Lógica básica de navegación y comportamiento en JS plano
*/

const appState = {
  currentScreen: 'login',
  isAuthenticated: false,
  currentProfileIndex: 0,
  profiles: [
    {
      id: 1,
      name: 'Hipo',
      age: 24,
      degree: 'Licenciatura en Historia',
      semester: '7° semestre',
      university: 'Universidad Central',
      bio: 'Me encantan las historias épicas, los museos y descubrir cafeterías nuevas cerca del campus.',
      interests: ['Historia', 'Lectura', 'Museos', 'Café'],
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    {
      id: 2,
      name: 'Andrew',
      age: 22,
      degree: 'Arquitectura',
      semester: '5° semestre',
      university: 'Universidad Central',
      bio: 'Fan de la arquitectura minimalista, el cine de autor y los maratones de diseño.',
      interests: ['Arquitectura', 'Cine', 'Fotografía'],
      photo: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg'
    },
    {
      id: 3,
      name: 'María',
      age: 21,
      degree: 'Psicología',
      semester: '4° semestre',
      university: 'Universidad Central',
      bio: 'Apasionada por entender a las personas, el arte y los voluntariados.',
      interests: ['Psicología', 'Arte', 'Voluntariado'],
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
    }
  ],
  interests: [
    { id: 'deportes', label: 'Deportes', emoji: '⚽' },
    { id: 'musica', label: 'Música', emoji: '🎵' },
    { id: 'cine', label: 'Cine', emoji: '🎬' },
    { id: 'arte', label: 'Arte', emoji: '🎨' },
    { id: 'videojuegos', label: 'Videojuegos', emoji: '🎮' },
    { id: 'lectura', label: 'Lectura', emoji: '📚' },
    { id: 'programacion', label: 'Programación', emoji: '💻' },
    { id: 'viajes', label: 'Viajes', emoji: '✈️' },
    { id: 'fotografia', label: 'Fotografía', emoji: '📸' },
    { id: 'cafe', label: 'Café', emoji: '☕' }
  ],
  selectedInterests: new Set()
};

function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function setScreen(screen) {
  appState.currentScreen = screen;
  qsa('.screen').forEach(section => {
    const s = section.getAttribute('data-screen');
    section.classList.toggle('screen--active', s === screen);
  });

  const topLeft = qs('#top-left-label');
  const topRight = qs('#top-right-action');
  const subtitle = qs('#logo-subtitle');
  const bottomNav = qs('#bottom-nav');

  topRight.textContent = '';
  topRight.onclick = null;

  switch (screen) {
    case 'login':
      topLeft.textContent = 'C&C';
      subtitle.textContent = 'Clase & Cita · Universidad';
      bottomNav.style.display = 'none';
      break;
    case 'register':
      topLeft.textContent = 'Registro';
      subtitle.textContent = 'Crea tu perfil universitario';
      bottomNav.style.display = 'none';
      break;
    case 'interests':
      topLeft.textContent = 'Intereses';
      subtitle.textContent = 'Personaliza tus coincidencias';
      bottomNav.style.display = 'none';
      break;
    case 'discover':
      topLeft.textContent = 'Descubrir';
      subtitle.textContent = 'Explora estudiantes de otras carreras';
      bottomNav.style.display = 'flex';
      setBottomNavActive('discover');
      break;
    case 'chat':
      topLeft.textContent = 'Chat';
      subtitle.textContent = 'Conversación activa';
      bottomNav.style.display = 'flex';
      setBottomNavActive('chat');
      break;
    case 'profile':
      topLeft.textContent = 'Mi perfil';
      subtitle.textContent = 'Configura cómo te ven los demás';
      bottomNav.style.display = 'flex';
      setBottomNavActive('profile');
      break;
    case 'settings':
      topLeft.textContent = 'Configuración';
      subtitle.textContent = 'Personaliza tu experiencia';
      bottomNav.style.display = 'flex';
      setBottomNavActive('profile');
      break;
  }
}

function setBottomNavActive(tab) {
  qsa('[data-nav-bottom]').forEach(btn => {
    const val = btn.getAttribute('data-nav-bottom');
    if (val === tab) {
      btn.classList.add('bottom-nav--active');
    } else {
      btn.classList.remove('bottom-nav--active');
    }
  });
}

/* LOGIN */
function initLogin() {
  const form = qs('#login-form');
  if (!form) return;
  const matriculaInput = qs('#login-matricula');
  const passwordInput = qs('#login-password');
  const matriculaError = qs('#login-matricula-error');
  const passwordError = qs('#login-password-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    [matriculaInput, passwordInput].forEach(el => el.classList.remove('field-error'));
    matriculaError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!matriculaInput.value.trim()) {
      hasError = true;
      matriculaInput.classList.add('field-error');
      matriculaError.textContent = 'Ingresa tu matrícula o correo.';
      matriculaError.style.display = 'block';
    }
    if (!passwordInput.value.trim()) {
      hasError = true;
      passwordInput.classList.add('field-error');
      passwordError.textContent = 'Ingresa tu contraseña.';
      passwordError.style.display = 'block';
    }

    if (!hasError) {
      appState.isAuthenticated = true;
      setScreen('discover');
      renderCurrentProfile();
    }
  });
}

/* REGISTER -> INTERESTS */
function initRegister() {
  const form = qs('#register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input[required], select[required]').forEach(el => {
      el.classList.remove('field-error');
      if (!el.value.trim()) {
        valid = false;
        el.classList.add('field-error');
      }
    });
    if (!valid) return;

    appState.isAuthenticated = true;
    setScreen('interests');
  });
}

/* INTERESTS */
function renderInterests() {
  const container = qs('#interests-container');
  if (!container) return;
  container.innerHTML = '';

  appState.interests.forEach(item => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'interest-chip';
    chip.dataset.id = item.id;
    chip.innerHTML = `<span>${item.emoji}</span><span>${item.label}</span>`;
    if (appState.selectedInterests.has(item.id)) {
      chip.classList.add('interest-chip--selected');
    }
    chip.addEventListener('click', () => {
      if (appState.selectedInterests.has(item.id)) {
        appState.selectedInterests.delete(item.id);
        chip.classList.remove('interest-chip--selected');
      } else {
        appState.selectedInterests.add(item.id);
        chip.classList.add('interest-chip--selected');
      }
    });
    container.appendChild(chip);
  });

  const continueBtn = qs('#interests-continue');
  const error = qs('#interests-error');
  if (continueBtn && error) {
    continueBtn.addEventListener('click', () => {
      if (appState.selectedInterests.size < 3) {
        error.style.display = 'block';
      } else {
        error.style.display = 'none';
        setScreen('discover');
        renderCurrentProfile();
      }
    });
  }
}

/* DISCOVER / SWIPE */
function renderCurrentProfile() {
  const p = appState.profiles[appState.currentProfileIndex];
  const photo = qs('#swipe-photo');
  const name = qs('#swipe-name');
  const degree = qs('#swipe-degree');
  const age = qs('#swipe-age');
  const status = qs('#swipe-status');
  if (!p || !photo || !name || !degree || !age || !status) return;

  photo.style.backgroundImage = `url('${p.photo}')`;
  name.textContent = p.name;
  degree.textContent = `${p.degree} · ${p.semester}`;
  age.textContent = p.age.toString();
  status.textContent = `Mostrando ${appState.currentProfileIndex + 1} de ${appState.profiles.length} perfiles`;
}

function nextProfile() {
  appState.currentProfileIndex = (appState.currentProfileIndex + 1) % appState.profiles.length;
  renderCurrentProfile();
}
function prevProfile() {
  appState.currentProfileIndex = (appState.currentProfileIndex - 1 + appState.profiles.length) % appState.profiles.length;
  renderCurrentProfile();
}

function initDiscover() {
  qsa('[data-swipe="next"]').forEach(btn => {
    btn.addEventListener('click', nextProfile);
  });
  qsa('[data-swipe="prev"]').forEach(btn => {
    btn.addEventListener('click', prevProfile);
  });

  const status = qs('#swipe-status');
  qsa('[data-action="like"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = appState.profiles[appState.currentProfileIndex];
      if (status && current) {
        status.textContent = `Te interesó el perfil de ${current.name}`;
      }
    });
  });
  qsa('[data-action="skip"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = appState.profiles[appState.currentProfileIndex];
      if (status && current) {
        status.textContent = `Saltaste el perfil de ${current.name}`;
      }
      nextProfile();
    });
  });
}

/* CHAT */
function initChat() {
  const form = qs('#chat-form');
  const input = qs('#chat-input');
  const bubbles = qs('#chat-bubbles');
  if (!form || !input || !bubbles) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const row = document.createElement('div');
    row.className = 'bubble-row sent';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble sent';
    bubble.textContent = text;
    row.appendChild(bubble);
    bubbles.appendChild(row);
    bubbles.scrollTop = bubbles.scrollHeight;
    input.value = '';

    setTimeout(() => {
      const r = document.createElement('div');
      r.className = 'bubble-row received';
      const b = document.createElement('div');
      b.className = 'chat-bubble received';
      b.textContent = '👍';
      r.appendChild(b);
      bubbles.appendChild(r);
      bubbles.scrollTop = bubbles.scrollHeight;
    }, 700);
  });
}

/* SETTINGS toggles */
function initSettings() {
  qsa('.toggle').forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('toggle--on');
    });
  });
}

/* Navegación genérica (botones con data-nav) */
function initNavigation() {
  qsa('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      if (!target) return;
      if (target === 'login') {
        appState.isAuthenticated = false;
      }
      setScreen(target);
      if (target === 'discover') {
        renderCurrentProfile();
      }
    });
  });

  qsa('[data-nav-bottom]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav-bottom');
      if (!target) return;
      setScreen(target);
      if (target === 'discover') renderCurrentProfile();
    });
  });
}

/* Init global */
document.addEventListener('DOMContentLoaded', () => {
  setScreen('login');
  initNavigation();
  initLogin();
  initRegister();
  renderInterests();
  initDiscover();
  initChat();
  initSettings();
});
