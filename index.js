/**
 * @param {String} name 
 * @returns {String} Greeting
 */
function greet(names = "my friend") {
    if(Array.isArray(names)) {
        return `Hello, ${greetGroup(names)}`;
    }
    if(isShouting(names)){
        return `HELLO, ${names}!`;
    }  
    return `Hello, ${names}.`;
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
 * TODO FIX THIS MESS.
 */

/**
 * 
 * @param {Array} names 
 * @returns {String}
 */
function greetGroup(names) {
    const parsed_names = normaliseNames(names);
    const lowerCaseNames = parsed_names.filter(name=>!isShouting(name));
    const quietGreeting = lowerCaseNames.reduce((sum, el, index) => {
        if(lowerCaseNames.length - 1 === index) {
            return oxfordComma(lowerCaseNames.length === 2, sum, el);
        }
        return `${sum}, ${el}`;
    }) + '.'
    if(parsed_names.some(isShouting)) {
        const upperCaseNames = names.filter(name=>isShouting(name));
        return `${quietGreeting} AND HELLO ${upperCaseNames}!`
    }
    return quietGreeting;

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
    return names.reduce((greetGroup, name) => {
        if (name.indexOf('"') !==-1) {
            greetGroup.push(name.replace(/"/g,''))
        }
        else if (name.indexOf(',') !== -1) {
            greetGroup.push(...name.split(',').map(el=>el.trim()));
            
        } else {
            greetGroup.push(name)
        }
        return greetGroup
    },[])
}

module.exports = {
    greet,
    isShouting,
    greetGroup,
    oxfordComma,
    normaliseNames
};