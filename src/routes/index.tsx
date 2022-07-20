import { NavigationContainer } from "@react-navigation/native";

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
 return(
 <NavigationContainer>
    <AppRoutes />
 </NavigationContainer>
 );
}

// Ideia desse arquivo  index é justamente fazer o sistema de If
// Caso o SignIn for "aceito", vamos para o AppRoutes