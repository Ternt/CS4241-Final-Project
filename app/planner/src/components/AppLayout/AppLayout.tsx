import { Outlet, NavLink } from "react-router-dom";
import React from 'react';

import "./AppLayout.css";


type pixel = `${number}px`
type percentage = `${number}%`
type em = `${number}em`
type rem = `${number}rem`

type baseValues = "inherit"

type valueTypes = pixel | percentage | em | rem | baseValues;

interface AppLayoutProp {
    header?: {
        height: valueTypes;
    };

    main?: {
        height?: valueTypes;
        padding?: valueTypes;
    }
}
export function AppLayout({ header, main } : AppLayoutProp) {
    const LayoutStyle = React.useMemo(() => {
        let headerHeight = "50px";
        if (header) {
            headerHeight = header.height ?? headerHeight;
        }


        let mainPadding = "0.5rem";
        let mainHeight = `calc(100vh - ${headerHeight} - 2 * ${mainPadding})`;
        if (main) {
            mainHeight = main.height ?? mainHeight;
            mainPadding = main.padding ?? mainPadding;
        }

        let style = `.appLayout {
            --app-header-height: ${headerHeight};
            --app-main-padding: ${mainPadding};
            --app-main-height: ${mainHeight};
        }`;

        return style;
    }, [main, header]);

    return (
        <div className={"appLayout"}>
            <style>
                {LayoutStyle}
            </style>
            <header className={"header"}>
                <nav className="navGroup">
                    <NavButton className="logo" to="/">
                        WPI Planner
                    </NavButton>
                </nav>
                <nav className="navGroup">
                    <NavButton className="menu-text" to="/">
                        Courses
                    </NavButton>
                    <NavButton className="menu-text" to="/">
                        Courses
                    </NavButton>
                </nav>
            </header>
            <main className={"main"}>
                <Outlet/>
            </main>
        </div>
    );
}


interface NavButtonProp {
    to: string;
    className?: string;
    children?: React.ReactNode;
}
function NavButton({ to, className, children } : NavButtonProp) {
    return (
        <button className="navLink">
            <NavLink 
                className={className ? className : ""}
                to={to}>
                {children}
            </NavLink>
        </button>
    )
}
