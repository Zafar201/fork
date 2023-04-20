import combineComponents from "./combineComponents";

import { AuthContextProvider } from "./Auth-context";

const providers = [AuthContextProvider];
const AppContextProvider = combineComponents(providers);

export default AppContextProvider;
