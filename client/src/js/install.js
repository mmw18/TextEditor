const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Storing triggered events
    window.deferredPrompt = event;

    // Removing hidden class from the button.
    butInstall.classList.toggle('hidden', false);
  });


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
