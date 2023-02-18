import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Error404 from "./views/Error404.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "#/404", view: Error404 },
        { path: "#/", view: Dashboard },
        { path: "#/posts", view: Posts },
        { path: "#/posts/:id", view: PostView },
        { path: "#/settings", view: Settings }
        
    ];

    console.log('location.pathname =', location.pathname, '    location.hash =', location.hash);

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.hash.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.hash]
        };

        // TODO: should redirect to /#/ instead of hack like this. 
        if (location.path !== '/' && location.hash === '') { // location.path !== '/' will cause issue if the site is under sub-folder.
            match = {
                route: routes[1],
                result: [location.hash]
            };
        }
    }

    const view = new match.route.view(getParams(match));
    window.$scope = view;

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});