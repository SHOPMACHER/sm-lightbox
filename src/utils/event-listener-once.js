/**
 * Triggers event listener once - fix for IE till version 11 and iOS till version 10
 *
 * @param $element
 * @param type
 * @param func
 */
export default($element, type, func) => {
    const handler = (event) => {
        $element.removeEventListener(type, handler);
        func(event);
    };

    $element.addEventListener(type, handler);
}