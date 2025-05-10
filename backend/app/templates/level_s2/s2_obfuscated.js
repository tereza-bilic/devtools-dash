const listenerCallbackToAddThenRemoveOnLoad = new SecretRevealer_{{level_session.finish_secret}}().say;
window.addEventListener('load', listenerCallbackToAddThenRemoveOnLoad);
const callbackToRemoveSelf = function () {
    window.removeEventListener('load', listenerCallbackToAddThenRemoveOnLoad);
    window.removeEventListener('load', callbackToRemoveSelf);
}
window.addEventListener('load', callbackToRemoveSelf);