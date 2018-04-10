const test = require('ava');
const {greet, isShouting, greetGroup, appendLastName, normaliseNames} = require('./index');

/**
 * Requirement 1
 * Write a method greet(name) that interpolates name in a simple greeting. 
 * For example, when name is "Bob", 
 * the method should return a string "Hello, Bob.".
 */

test('Greeting', t => {
   const greeting = greet("Tom");
   t.is(greeting, "Hello, Tom.")
});

/**
 * Requirement 2
 * Handle nulls by introducing a stand-in. For example, when name is null, 
 * then the method should return the string "Hello, my friend."
 */
test('Greeting handles null', t => {
    const greeting = greet();
    t.is(greeting, "Hello, my friend.");
});

/**
 * Requirement 3
 * Handle shouting. When name is all uppercase, 
 * then the method should shout back to the user. 
 * For example, when name is "JERRY" 
 * then the method should return the string "HELLO JERRY!"
 */
test('Greeting shouts back', t => {
    const greeting = greet("JERRY");
    t.is(greeting, "HELLO, JERRY!")
});

test('isShouting returns true if message was all caps', t => {
    const shouting = isShouting("ANGRY SHOUTING");
    t.is(shouting, true)
});

test('isShouting returns true if message was all caps', t => {
    const shouting = isShouting("quietness");
    t.is(shouting, false);
});

/**
 * Requirement 4
 * Handle two names of input. When name is an array of two names 
 * (or, in languages that support it, varargs or a splat), 
 * then both names should be printed. For example, when name is ["Jill", "Jane"], 
 * then the method should return the string "Hello, Jill and Jane."
 */
test('Greeting can handle 2 names', t => {
    const greeting = greet(['Jill', 'Jane']);
    t.is(greeting, "Hello, Jill and Jane.");
});

/**
 * Requirement 5
 * Handle arbitrarily names of input. When name represents more than two names, 
 * separate them with commas and close with an Oxford comma and "and". 
 * For example, when name is ["Amy", "Brian", "Charlotte"], 
 * then the method should return the string 
 * "Hello, Amy, Brian, and Charlotte."
 */
test('Greeting can handle multiple names', t => {
    const greeting = greet(['Amy','Brian', 'Charlotte']);
    t.is(greeting, "Hello, Amy, Brian, and Charlotte.");
});

/**
 * Requirement 7
 * If any entries in name are a string containing a comma, 
 * split it as its own input. For example, when name is ["Bob", "Charlie, Dianne"], 
 * then the method should return the string 
 * "Hello, Bob, Charlie, and Dianne.".
 */
test('Greeting can parse weird strings', t => {
    const greeting = greet(["Bob", "Charlie, Dianne"]);
    t.is(greeting, "Hello, Bob, Charlie, and Dianne.")
});

test('greetGroup splits array of 2 names into string delimited by and', t => {
    const names = greetGroup(["Test", "Test"]);
    t.is(names, "Test and Test.");
});

test('greetGroup splits array of 3 or mote names into string delimited by , and the last name by , and', t => {
    const names = greetGroup(["Test", "Test", "Test"]);
    t.is(names, "Test, Test, and Test.")
})
test('Oxford Comma Decides how to present last name', t => {
    const x = appendLastName(false, 'test', 'test')
    t.is(x,"test and test");
});
test('Oxford Comma Decides how to present last name', t => {
    const x = appendLastName(true, 'test', 'test')
    t.is(x,"test, and test");
})
test('NormaliseNames parses names separated by , into one array', t => {
    const names = normaliseNames(["Small Cat", "Fast Cat, Smelly Cat"]);
    t.is(names.toString(), ["Small Cat", "Fast Cat", "Smelly Cat"].toString())
});

/**
 * Requirement 8
 * Allow the input to escape intentional commas introduced by Requirement 7. 
 * These can be escaped in the same manner that CSV is, 
 * with double quotes surrounding the entry. For example, 
 * For example, when name is ["Bob", ""Charlie, Dianne""], 
 * then the method should return the string 
 * "Hello, Bob and Charlie, Dianne.".
 */
test('Greeting escapes " and then ignores the oxford comma', t => {
    const greeting = greet(["Bob", "\"Charlie, Dianne\""]);
    t.is(greeting, "Hello, Bob and Charlie, Dianne.");
});

/**
 * Requirement 6
 * Allow mixing of normal and shouted names 
 * by separating the response into two greetings. 
 * For example, when name is ["Amy", "BRIAN", "Charlotte"], 
 * then the method should return the string 
 * "Hello, Amy and Charlotte. AND HELLO BRIAN!"
 */

test('Greeting can handle a mix of shouting and regular greetings', t => {
    const greeting = greet(["Amy", "BRIAN"])
    t.is(greeting, "Hello, Amy. AND HELLO BRIAN!")
});

test('Greeting can handle a mix of shouting and various names', t => {
    const greeting = greet(["Brian", "AMY"]);
    t.is(greeting, "Hello, Brian. AND HELLO AMY!")
});


test('Greeting can handle a mix of shouting and various names', t => {
    const greeting = greet(["AMY", "Brian"]);
    t.is(greeting, "Hello, Brian. AND HELLO AMY!")
});

test('Greeting can handle 3 names', t => {
    const greeting = greet(["Amy", "BRIAN", "Charlotte"]);
    t.is(greeting, "Hello, Amy and Charlotte. AND HELLO BRIAN!")
});