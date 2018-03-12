import smSlider from 'sm-slider';

import { ESC_KEY } from './constants';

import hide from './hide';
import sync from './sync';
import resize from './resize';
import { addListenerOnce } from '../utils/event-listener';

/**
 * Shows the slider in an overlay
 *
 * @param $element
 * @param store
 */
export default ($element, store) => {
    let { mainSlider, thumbSlider } = store.getState();
    const { $shadow, $closer, $wrapper, $mainGroup, $thumbGroup, options, group } = store.getState();
    const index = parseInt($element.getAttribute('data-lightbox-index'), 10);

    $shadow.style.display = 'inherit';
    $wrapper.classList.remove('hidden');

    addListenerOnce($shadow, 'transitionend', () => $mainGroup.classList.remove('hidden'));
    addListenerOnce($shadow, 'click', hide.bind(undefined, store));
    addListenerOnce(document, 'keydown', event => event.keyCode === ESC_KEY && hide(store));

    window.requestAnimationFrame(() => $shadow.classList.remove('lightbox-shadow--hidden'));

    const $lightboxImages = document.querySelectorAll(`#lightbox-wrapper--${group} .slides-wrapper`);

    if (options.showCloseButton) {
        addListenerOnce($closer, 'click', hide.bind(undefined, store));
        window.requestAnimationFrame(() => $closer.classList.remove('lightbox-shadow--closer-hidden'));
    }

    if (!mainSlider) {
        mainSlider = new smSlider($mainGroup, options.mainSlider);
        mainSlider.toSlide(index);

        if (options.showThumbSlider) {
            thumbSlider = new smSlider($thumbGroup, options.thumbSlider);

            sync(store);
        }

        store.setState({
            mainSlider,
            thumbSlider
        });

        window.addEventListener('resize', () => resize($lightboxImages, store));
        resize($lightboxImages, store);
    } else {
        mainSlider.toSlide(index);
    }
}
