export default {
    // corpus
    setCorpusData(state, payload) {
        state.bankData.corpus = payload;
    },
    setIsLoading(state, payload) {
        state.isLoading = payload;
    },
}