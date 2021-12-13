import {html} from "/node_modules/lit-html/lit-html.js";

export const navBar = () => html`
    <header id="site-header">
        <nav class="navbar">
            <section class="navbar-dashboard">
                <a href="/home">Home</a>
            </section>
        </nav>
    </header>`

export const footer = () => html`
    <footer id="site-footer">
        <p>&copy; M0673N</p>
    </footer>`