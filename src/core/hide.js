import once from '../utils/event-listener-once';

export default (store) => {
    const { $shadow, $closer, $wrapper, $group, options} = store.getState();

    once($shadow, 'transitionend', () => $shadow.style.display = 'none');

    $wrapper.classList.add('hidden');
    $group.classList.add('hidden');
    $shadow.classList.add('lightbox-shadow--hidden');

    if (options.showCloseButton) {
        $closer.classList.add('lightbox-shadow--closer-hidden');
    }
}
