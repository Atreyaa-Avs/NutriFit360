import { NavigationState, PartialState } from "@react-navigation/native";

// Utility to recursively get the focused route name
export function getFocusedRouteName(
  state: NavigationState | PartialState<NavigationState> | undefined
): string {
  let currentState = state;
  while (currentState?.routes && currentState.index != null) {
    const nextRoute = currentState.routes[currentState.index];
    if (!nextRoute.state) return nextRoute.name;
    currentState = nextRoute.state;
  }
  return "";
}