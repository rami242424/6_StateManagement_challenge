import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        textColor: string;
        accentColor: string;
        mode : "light" | "dark";
    }
}