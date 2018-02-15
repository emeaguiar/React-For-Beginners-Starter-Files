import Rebase from 're-base';

/**
 * Connects to Firebase
 * @TODO this should probably not be included in repo
 */
const base = Rebase.createClass( {
	apiKey: "AIzaSyAiWHEnF6niawgAFwCT5w2eUvcUDYNiDSE",
    authDomain: "reacttest-53854.firebaseapp.com",
    databaseURL: "https://reacttest-53854.firebaseio.com",
} );

export default base;
