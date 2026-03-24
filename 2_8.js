function sumUnique(arr) {
    const counts = {};
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];

        if (counts[value] === undefined) {
            counts[value] = 1;
        } else {
            counts[value]++;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (counts[arr[i]] === 1) {
            sum += arr[i];
        }
    }

    return sum;
}