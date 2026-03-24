function isPalindrome(value) {
    const str = String(value)
        .toLowerCase()
        .replace(/[^a-zа-я0-9ё]/gi, '');

    const reversed = str.split('').reverse().join('');

    return str === reversed;
}

function isPalindromePointers(value) {
    const str = String(value)
        .toLowerCase()
        .replace(/[^a-zа-я0-9ё]/gi, '');

    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}