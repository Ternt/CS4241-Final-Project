import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"

import { AppDataProvider } from "@/components/Contexts/StateProvider"
import { AppLayout } from "@/components/AppLayout/AppLayout"
import { Courses } from "@/routes/Courses/Courses"

const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <AppDataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout/>}>
                            <Route path={"/"} element={<Courses/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppDataProvider>
        </QueryClientProvider>
    );
}
