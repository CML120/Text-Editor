// Get the 'Install' button element
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default installation prompt from showing
    event.preventDefault();
    butInstall.classList.toggle('hidden', false);
    window.deferredPrompt = event;
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Get the stored 'beforeinstallprompt' event
    const promptEvent = window.deferredPrompt;
    // console.log('Install prompt started!')  < indicate user has clicked the button 
    if (!promptEvent) {
        return;
    }
    // Show the installation prompt
    promptEvent.prompt();
    window.deferredPrompt = null;
    // Hide the 'Install' button
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event)
    // Reset the stored 'beforeinstallprompt' event to null
    window.deferredPrompt = null;
});
