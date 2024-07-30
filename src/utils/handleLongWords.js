export function handleLongWords(input, maxLength) {
    return input
        .split(" ")
        .map(word => word.length > maxLength ? word.slice(0, maxLength) + '...' : word)
        .join(" ");
}