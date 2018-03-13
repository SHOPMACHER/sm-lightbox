import { addListenerInternal, dispatch } from '../utils/event-listener';

/**
 * Syncs the main slider with the thumbslider in both directions
 *
 * @param store
 */
export default (store) => {
    const { $mainGroup, $thumbGroup } = store.getState();
    const $thumbnailContainers = $thumbGroup.querySelectorAll('.slide');

    // Listeners and dispatchers to sync next/previous events
    addListenerInternal($mainGroup, 'slide', event => syncThumbslider($thumbGroup, $thumbnailContainers, event.detail.to));

    // Click handler for the thumbnails
    Array.prototype.forEach.call($thumbnailContainers, $thumbnail => {
        const index = parseInt($thumbnail.getAttribute('data-sm-slider-index'), 10);

        $thumbnail.addEventListener('click', () => {
            syncThumbslider($thumbGroup, $thumbnailContainers, index);
            dispatch($mainGroup, 'slide', index);
        });
    });
}

/**
 * Syncs the thumb slider to the active index
 *
 * @param $thumbnails Thumbnail slide
 * @param $thumbnailContainers Thumbnail Container
 * @param activeIndex The active index to slide to
 */
const syncThumbslider = ($thumbnails, $thumbnailContainers, activeIndex) => {
    Array.prototype.forEach.call($thumbnailContainers, $thumbnail => {
        const index = parseInt($thumbnail.getAttribute('data-sm-slider-index'), 10);

        if (activeIndex === index) {
            $thumbnail.classList.add('is-active');
            dispatch($thumbnails, 'slide', activeIndex);
        } else {
            $thumbnail.classList.remove('is-active');
        }
    });
};
