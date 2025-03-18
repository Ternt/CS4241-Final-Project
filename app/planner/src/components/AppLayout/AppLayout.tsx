import { Group, Title, UnstyledButton } from "@mantine/core";
import { Outlet, NavLink } from "react-router-dom";
import React from 'react';
import cx from "clsx";

import "./AppLayout.css";


export function AppLayout() {
  return (
    <>
      <header className={"header"}>
        <Group>
          <UnstyledButton
            renderRoot={({ className, ...others }) => (
              <NavLink to={"/"} className={cx(className)} {...others} />
            )}
          >
            <Title order={2} fw={"700"}>
              Planner
            </Title>
          </UnstyledButton>
        </Group>
        <div className={"headerGroup"}>
          <div className={"headerMenu"}>
            <UnstyledButton
              className={"menuButton"}
              renderRoot={({ className, ...others }) => (
                <NavLink to={"/"} className={cx(className)} {...others} />
              )}
            >
              <Title order={4} fw={"600"}>
                Courses
              </Title>
            </UnstyledButton>
          </div>
          <div className={"headerMenu"}>
            <UnstyledButton
              className={"menuButton"}
              renderRoot={({ className, ...others }) => (
                <NavLink
                  to={"/scheduler"}
                  className={cx(className)}
                  {...others}
                />
              )}
            >
              <Title order={4} fw={"600"}>
                Schedule
              </Title>
            </UnstyledButton>
          </div>
        </div>
      </header>
      <main className={"main"}>
        <Outlet/>
      </main>
    </>
  );
}