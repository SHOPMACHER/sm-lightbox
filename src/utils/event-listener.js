/**
 * Triggers event listener once - fix for IE till version 11 and iOS till version 10
 *
 * @param $element
 * @param type
 * @param func
 */
export const addListenerOnce = ($element, type, func) => {
    const handler = (event) => {
        $element.removeEventListener(type, handler);
        func(event);
    };

    $element.addEventListener(type, handler);
};

/**
 * Helper to add event listeners that don't handle events
 * that are flagged 'external'.
 *
 * This is to prevent infinite loops when triggering an event that is handled by both sliders.
 *
 * @param $element Element to attach the listener to
 * @param event Eventname
 * @param handler Eventhandler
 */
export const addListenerInternal = ($element, event, handler) => {
    $element.addEventListener(event, function (event) {
        if (event.detail && event.detail.external) {
            return;
        }

        handler(event);
    });
};

/**
 * Dispatches a custom event from the this-refernce.
 *
 * @param $element Element thats dispatch the event
 * @param event Eventname
 * @param to Optionalparameter for the slide index
 */
export const dispatch = ($element, event, to) => {
    $element.dispatchEvent(new CustomEvent(event, {
        detail: {
            external: true,
            to: to
        }
    }));
};
