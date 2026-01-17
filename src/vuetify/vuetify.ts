import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'cocktailTheme',
        themes: {
            cocktailTheme: {
                dark: false,
                colors: {
                    primary: '#ff6f3c',
                    secondary: '#ffa85c',
                    background: '#fff8f2',
                    surface: '#fff',
                    error: '#ff4d4f',
                    info: '#ffd699',
                    success: '#ffb347',
                    warning: '#ff8c42',
                },
            },
        },
    },
});