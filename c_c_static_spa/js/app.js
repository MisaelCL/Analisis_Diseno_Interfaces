
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
      { id: 'deportes', label: 'Deportes', icon: 'sports_soccer' },
      { id: 'musica', label: 'Música', icon: 'music_note' },
      { id: 'cine', label: 'Cine', icon: 'movie' },
      { id: 'arte', label: 'Arte', icon: 'palette' },
      { id: 'videojuegos', label: 'Videojuegos', icon: 'sports_esports' },
      { id: 'lectura', label: 'Lectura', icon: 'menu_book' },
      { id: 'programacion', label: 'Programación', icon: 'computer' },
      { id: 'viajes', label: 'Viajes', icon: 'flight' },
      { id: 'fotografia', label: 'Fotografía', icon: 'photo_camera' },
      { id: 'cafe', label: 'Café', icon: 'coffee' }
  ],
  selectedInterests: new Set()
};

const iconMarkup = (name) => `<span class="material-icons" aria-hidden="true">${name}</span>`;

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
  const notificationsModal = qs('#notifications-modal');
  const notificationsBackdrop = qs('#notifications-backdrop');

  notificationsModal?.classList.remove('is-open');
  if (notificationsBackdrop) {
    notificationsBackdrop.classList.remove('is-open');
    notificationsBackdrop.setAttribute('aria-hidden', 'true');
    }

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
      setBottomNavActive('settings');
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
    const forgotBtn = qs('#forgot-password');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    [matriculaInput, passwordInput].forEach(el => el.classList.remove('field-error'));
    matriculaError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!matriculaInput.value.trim()) {
      hasError = true;
      matriculaInput.classList.add('field-error');
      matriculaError.textContent = 'Ingresa tu correo electrónico.';
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

    if (forgotBtn) {
        forgotBtn.addEventListener('click', () => {
            alert('Hemos enviado indicaciones a tu correo para recuperar tu contraseña.');
        });
    }
}

/* REGISTER -> INTERESTS */
function initRegister() {
  const form = qs('#register-form');
    if (!form) return;
    const confirmInput = qs('#reg-password-confirm');
    const confirmError = qs('#reg-password-confirm-error');
    const privacyCheckbox = qs('#reg-privacy');
    const privacyLink = qs('#privacy-link');
    const privacyTooltip = qs('#privacy-tooltip');
    const privacyClose = qs('#privacy-tooltip-close');

    const openPrivacyTooltip = () => {
        if (!privacyTooltip) return;
        privacyTooltip.classList.add('open');
        privacyTooltip.setAttribute('aria-hidden', 'false');
    };

    const closePrivacyTooltip = () => {
        if (!privacyTooltip) return;
        privacyTooltip.classList.remove('open');
        privacyTooltip.setAttribute('aria-hidden', 'true');
    };

    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openPrivacyTooltip();
        });
    }

    privacyClose?.addEventListener('click', closePrivacyTooltip);
    if (privacyTooltip) {
        privacyTooltip.addEventListener('click', (e) => {
            if (e.target === privacyTooltip) {
                closePrivacyTooltip();
            }
        });
    }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
      let valid = true;
      if (confirmError) confirmError.style.display = 'none';
      if (confirmInput) confirmInput.setAttribute('aria-invalid', 'false');
      if (privacyCheckbox) privacyCheckbox.setAttribute('aria-invalid', 'false');
    form.querySelectorAll('input[required], select[required]').forEach(el => {
      el.classList.remove('field-error');
      if (!el.value.trim()) {
        valid = false;
          el.classList.add('field-error');
          if (el === privacyCheckbox) {
              el.setAttribute('aria-invalid', 'true');
          }
      }
    });
      if (confirmInput && confirmError) {
          confirmError.style.display = 'none';
          confirmInput.setAttribute('aria-invalid', 'false');
          if (confirmInput.value.trim() !== qs('#reg-password').value.trim()) {
              valid = false;
              confirmInput.classList.add('field-error');
              confirmInput.setAttribute('aria-invalid', 'true');
              confirmError.textContent = 'Las contraseñas no coinciden';
              confirmError.style.display = 'block';
          }
      }

      if (privacyCheckbox && !privacyCheckbox.checked) {
          valid = false;
          privacyCheckbox.classList.add('field-error');
          privacyCheckbox.setAttribute('aria-invalid', 'true');
      }
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
      chip.innerHTML = `${iconMarkup(item.icon)}<span>${item.label}</span>`;
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
    const heart = qs('#heart-action');

    const setHeartState = (iconName, className) => {
        if (!heart) return;
        heart.innerHTML = iconMarkup(iconName);
        heart.classList.remove('heart-pulse', 'heart-broken');
        if (className) heart.classList.add(className);
    };

    const handleNextWithFeedback = (message, heartIcon, heartClass) => {
        const current = appState.profiles[appState.currentProfileIndex];
        if (status && current) {
            status.textContent = message.replace('{name}', current.name);
        }
        setHeartState(heartIcon, heartClass);
        setTimeout(() => setHeartState('favorite'), 500);
        setTimeout(() => nextProfile(), 350);
    };

    const dislikeBtn = qs('[data-action="dislike"]');
    const likeBtn = qs('[data-action="like"]');
    const acceptBtn = qs('[data-action="accept"]');

    dislikeBtn?.addEventListener('click', () => {
        handleNextWithFeedback('Rechazaste el perfil de {name}', 'heart_broken', 'heart-broken');
  });

    likeBtn?.addEventListener('click', () => {
        handleNextWithFeedback('Guardaste el perfil de {name}', 'favorite', 'heart-pulse');
    });

    acceptBtn?.addEventListener('click', () => {
        handleNextWithFeedback('Te gustó el perfil de {name}', 'favorite', 'heart-pulse');
  });
}

function initNotifications() {
    const trigger = qs('#notifications-btn');
    const modal = qs('#notifications-modal');
    const backdrop = qs('#notifications-backdrop');
    const dismissBtn = qs('#notifications-dismiss');
    if (!trigger || !modal || !backdrop) return;

    const close = () => {
        modal.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
    };

    const open = () => {
        modal.classList.add('is-open');
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
    };

    trigger.addEventListener('click', () => {
        if (modal.classList.contains('is-open')) {
            close();
        } else {
            open();
        }
    });

    dismissBtn?.addEventListener('click', close);
    backdrop.addEventListener('click', close);
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
        b.innerHTML = iconMarkup('thumb_up');
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
  initNotifications();
  initChat();
  initSettings();
});
