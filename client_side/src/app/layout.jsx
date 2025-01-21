import '../styles/global.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
    title: "My App", // Customize the title
    description: "An example application layout.",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
