/**
 * @param {String} name 
 * @returns {String} Greeting
 */
function greet(names = "my friend") {
    if (Array.isArray(names)) {
        return `Hello, ${greetGroup(names)}`;
    }
    if (isShouting(names)) {
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
 * 
 * @param {Array} names 
 * @returns {String}
 */
function greetGroup(names) {
    const parsed_names = normaliseNames(names);
    return createQuietGreeting(parsed_names) + createLoudGreeting(parsed_names);
}

/**
 * 
 * @param {Array} names 
 */
function createLoudGreeting(names) {
    if (names.some(isShouting)) {
        return ` AND HELLO ${names.filter(name=>isShouting(name))}!`;
    }
    return '';
}


// TODO FIX THIS
/**
 * 
 * @param {Array} names
 * @returns {String} quietgreeting 
 */
function createQuietGreeting(names) {
    const lowerCaseNames = names.filter(name => !isShouting(name));
    return lowerCaseNames.reduce((greeting, name, index, lowerCaseNames) => buildCommaList(greeting, name, index, lowerCaseNames)) + '.';
}

const isLastName = (names, index) => names.length - 1 === index;
// ISH
function buildCommaList(greeting, name, index, names) {
    if (isLastName(names, index)) {
        const needsOxford = names.length > 2
        return appendLastName(needsOxford, greeting, name);
    }
    return appendName(greeting, name);
}

function appendName(greeting, name) {
    return `${greeting}, ${name}`;
}
/**
 * 
 * @param {Number} greeting_length
 * @param {String} previous 
 * @param {String} lastname 
 * @returns {String} parsed
 */
function appendLastName(needsOxford, previous, lastname) {
    if (needsOxford) {
        return `${previous}, and ${lastname}`;
    }
    return `${previous} and ${lastname}`;
}


// TODO WTF MATE (Exceded wtf per minute limit)

/**
 * 
 * @param {Array} names
 * @returns {Array} normalisedNames
 */
function normaliseNames(names) {
    return names.reduce((greetGroup, name) => {
        if (name.indexOf('"') !== -1) {
            greetGroup.push(name.replace(/"/g, ''))
        } else if (name.indexOf(',') !== -1) {
            greetGroup.push(...name.split(',').map(name => name.trim()));

        } else {
            greetGroup.push(name)
        }
        return greetGroup
    }, [])
}

module.exports = {
    greet,
    isShouting,
    greetGroup,
    appendLastName,
    normaliseNames
};