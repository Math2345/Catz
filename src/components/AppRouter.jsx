import React from "react";
import { useContext } from "react";
import { Context } from "..";
import { Routes, Route, Navigate } from 'react-router-dom'


//components
import RequireAuth from "./RequireAuth";


//routing
import { publicRoutes, protectedRoutes } from "../routes";
import { PAGE404_ROUTE } from "../utils/consts"


// styles
import { AppWrapper, Container } from "../styles/styles"



const AppRouter = () => {
    const { user } = useContext(Context)

    return (
        <AppWrapper>
            <Container>
                <Routes>
                    {publicRoutes.map(({ path, Elem }) =>
                        <Route key={path}
                            path={path}
                            element={<Elem />}
                            exact
                        />
                    )}
                    {protectedRoutes.map(({ path, Elem, role }) =>
                        <Route key={path} element={<RequireAuth allowedRoles={role} />}>
                            <Route key={path}
                                path={path}
                                element={<Elem />}
                                exact
                            />
                        </Route>
                    )}

                    <Route path="*" element={<Navigate to={PAGE404_ROUTE} />} />
                </Routes>
            </Container>
        </AppWrapper>
    )
}

export default AppRouter