export default class Store {

    constructor(initialState, handler) {
        this.state = initialState;
        this.handler = handler;
    }

    getState() {
        return this.state;
    }

    setState(nextState) {
        const prevState = {...this.state};

        switch (typeof nextState) {
            case 'function':
                this.state = {
                    ...this.state,
                    ...nextState(this.state)
                };
                break;
            case 'object':
                this.state = {
                    ...this.state,
                    ...nextState
                };
                break;
            default:
                throw new Error();
        }

        this.handler(prevState);
    }
}
