export const migrationsManifest = {
    0: (state) => {
        return {
            main: {
                people: state.people,
                moneyCells: state.moneyCells,
                transactions: state.transactions,
                articles: state.articles,
                systemData: state.systemData
            }
        };
    }
};