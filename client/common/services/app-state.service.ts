import { BehaviorSubject } from 'rxjs';
import AppState from '../models/app-state';

const appState$ = new BehaviorSubject({});
let appCurrentState: AppState;

const AppStateService = {
    getState: () => appState$.asObservable(),
    updateState: (newState: AppState) => {
        appCurrentState = { ...appCurrentState, ...newState };

        appState$.next(appCurrentState);
    }
}

export default AppStateService;