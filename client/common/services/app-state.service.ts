import { BehaviorSubject } from 'rxjs';
import AppState from '../models/app-state';

const appState$ = new BehaviorSubject({});
let appCurrentState: AppState;

const lastSelectedFile$: BehaviorSubject<{ fileFullPath: string, columnIndex: number }> = new BehaviorSubject({} as any);

const AppStateService = {
    getState: () => appState$.asObservable(),
    updateState: (newState: AppState) => {
        appCurrentState = { ...appCurrentState, ...newState };

        appState$.next(appCurrentState);
    },
    selectFile: (fileFullPath: string, columnIndex: number) => {
        lastSelectedFile$.next({ fileFullPath, columnIndex });
    },
    getSelectedFile: () => lastSelectedFile$.asObservable()
}

export default AppStateService;