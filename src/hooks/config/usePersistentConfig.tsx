import createPersistedState from 'use-persisted-state';
import { Config } from '../../generated/graphql';

const key = 'basilisk-config';
export const defaultConfigValue = {
    nodeUrl: process.env.REACT_APP_NODE_URL!,
    processorUrl: process.env.REACT_APP_PROCESSOR_URL!,
    appName: process.env.REACT_APP_APP_NAME!
};

// TODO: write apollo integration for querying and mutating the config
const usePersistedConfig = createPersistedState(key)
export const usePersistentConfig = () => usePersistedConfig<Config>(defaultConfigValue);