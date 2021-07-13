const htmlTree = (props) => {
    const element = document.createElement(props.tag);
    Object.keys(props).filter((key) => keywords.indexOf(key) !== -1)
        .forEach((keyword) => actions[keyword](element,props[keyword]));

    return element;
};