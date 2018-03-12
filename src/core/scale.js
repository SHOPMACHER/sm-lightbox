/**
 * Gets the image scale on viewport
 */
export default (image, boxWidth, boxHeight) => {
    const imageWidth = image.width;
    const imageHeight = image.height;

    if (imageWidth / boxWidth < imageHeight / boxHeight) {
        if (imageHeight >= boxHeight) {
            return {
                width: imageWidth * (boxHeight / imageHeight),
                height: boxHeight
            };
        }
    } else {
        if (imageWidth >= boxWidth) {
            return {
                width: boxWidth,
                height: imageHeight * (boxWidth / imageWidth)
            };
        }
    }

    return {
        width: imageWidth,
        height: imageHeight
    };
}
