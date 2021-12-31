export default {
    // bankData
    setBankData(state, payload) {
        state.bankData = payload;
    },
    // corpus
    setCorpusData(state, payload) {
        state.bankData.corpus = payload;
    },
    setIsLoading(state, payload) {
        state.isLoading = payload;
    },
}