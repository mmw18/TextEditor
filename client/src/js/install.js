const butInstall = document.getElementById('buttonInstall');
// Logic for installing the PWA

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // Storing triggered events
    window.deferredPrompt = event;

    // Removing hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

//   Click event handler for butInstall element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // If no stored event, exit function
    if (!promptEvent) {
        return;
    }
    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Handler for appInstalled event
window.addEventListener('appinstalled', (event) => {
    // Clearing prompt
    window.deferredPrompt = null;
    // Logging the installation event
    console.log('PWA has been installed', event);
});
