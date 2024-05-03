const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('hit')
  console.log("event" + event)
  event.preventDefault();
  // Stores the triggered events
  window.deferredPrompt = event;

  // Removes the hidden class from the button.
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  // Shows prompt
  promptEvent.prompt();

  // Resets the deferred prompt variable, which it can only be used once.
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  // Clears prompt
  console.log('install hit')
  window.deferredPrompt = null;
});
