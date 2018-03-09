import { addListenerOnce } from '../utils/event-listener';

/**
 * Hides the overlay
 *
 * @param store
 */
export default (store) => {
    const { $shadow, $closer, $wrapper, $mainGroup, options} = store.getState();

    addListenerOnce($shadow, 'transitionend', () => $shadow.style.display = 'none');

    $wrapper.classList.add('hidden');
    $mainGroup.classList.add('hidden');
    $shadow.classList.add('lightbox-shadow--hidden');

    if (options.showCloseButton) {
        $closer.classList.add('lightbox-shadow--closer-hidden');
    }
}
