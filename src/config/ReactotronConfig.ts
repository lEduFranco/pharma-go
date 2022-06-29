import { AsyncStorage } from "react-native";
import Reactotron from "reactotron-react-native";

Reactotron.setAsyncStorageHandler?.(AsyncStorage)
  .configure({ name: "React Native App" })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (): boolean => false },
    overlay: false,
  })
  .connect();
