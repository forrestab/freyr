export function contains(word: string, searchWords: string[]): boolean {
    return searchWords.some(
        (searchWord: string) => word.toLowerCase().includes(searchWord.toLowerCase())
    );
}
