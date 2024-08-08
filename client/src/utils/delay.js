/**
 * Returns a promise that resolves after a specified delay.
 * 
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise} A promise that resolves after the delay.
 */
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export default delay;
