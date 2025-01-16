import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { GluestackUIProvider } from "./app/components/ui/gluestack-ui-provider";
import { AppProvider } from "./app/context/app.context";
import AppNavigations from "./app/navigations";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <AppProvider>
        <AppNavigations />
        <StatusBar backgroundColor="#FFF" />
      </AppProvider>
    </GluestackUIProvider>
  );
}
