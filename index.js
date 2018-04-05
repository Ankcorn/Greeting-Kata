
/**
 * @param {String} name 
 * @returns {String} Greeting
 */
function greet(name = "my friend") {
    if(Array.isArray(name)) {
        return `Hello, ${group(name)}.`
    }
    if(isShouting(name)){
        return `HELLO, ${name}!`;
    }
    return `Hello, ${name}.`;
}

/**
 * 
 * @param {String} message
 * @returns {boolean}
 */
function isShouting(message) {
    return message === message.toUpperCase();
}

/**
 * 
 * @param {Array} names 
 * @returns {String}
 */
function group(names) {
    const parsed_names = normaliseNames(names)
    return parsed_names.reduce((sum, el, index) => {
        if(parsed_names.length - 1 === index) {
            return oxfordComma(parsed_names.length === 2, sum, el);
        }
        return `${sum}, ${el}`;
    })
}

/**
 * 
 * @param {Number} greeting_length
 * @param {String} previous 
 * @param {String} lastname 
 * @returns {String} parsed
 */
function oxfordComma(shouldOxford, previous, lastname) {
    if(shouldOxford) {
        return `${previous} and ${lastname}`;
    }
    return `${previous}, and ${lastname}`;
}

/**
 * 
 * @param {Array} names
 * @returns {Array} normalisedNames
 */
function normaliseNames(names) {
    return names.reduce((group, name) => {
        if (name.indexOf('"') !==-1) {
            group.push(name.replace(/"/g,''))
        }
        else if (name.indexOf(',') !== -1) {
            group.push(...name.split(',').map(el=>el.trim()));
            
        } else {
            group.push(name)
        }
        return group
    },[])
}

module.exports = {
    greet,
    isShouting,
    group,
    oxfordComma,
    normaliseNames
};