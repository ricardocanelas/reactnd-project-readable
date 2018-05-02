import { createBrowserHistory } from 'history';

export default createBrowserHistory();


/*
 * Another way:
 *
 * import createBrowserHistory from 'history/createBrowserHistory'
 * const history = createBrowserHistory()
 * history.pushLater = (...args) => setImmediate(() => history.push(...args))
 * export default history
*/