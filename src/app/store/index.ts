import { combineReducers, ActionReducer, Action, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleWithProviders } from '@angular/core';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { profileReducer, IProfile } from './profile/profile.reducer';
import { ProfileEffects } from './profile/profile.effects';
import { environment } from '../../environments/environment';
// all new reducers should be define here
export interface IAppState {
  profile: IProfile;
}

// all new reducers should be define here
const reducers = {
  profile: profileReducer
};

const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);
const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: IAppState, action: Action) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const store: ModuleWithProviders = StoreModule.provideStore(reducer);
export const instrumentation: ModuleWithProviders =
  (!environment.production) ? StoreDevtoolsModule.instrumentOnlyWithExtension() : undefined;

export const effects: ModuleWithProviders[] = [
  EffectsModule.run(ProfileEffects)
];
