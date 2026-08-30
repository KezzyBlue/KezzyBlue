import { Routes, Route } from "react-router-dom";
import { routes } from "../config/routes.jsx";
import MainLayout from "../layouts/main/MainLayout.jsx";

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {routes.map((route1) => ( /* Người viết: két zi bờ lu: 
                                            Nhớ route1 đây là nơi lưu các trang chính nha ku (trang bậc 0) */
                    <Route key={route1.path} path={route1.path} element={route1.element}>
                        {route1.children?.map((route2, index) => ( /* Người viết: két zi bờ lu: Route2 là các  trang bậc 1 */
                            <Route key={route2.path ?? index} index={route2.index} path={route2.path} element={route2.element}>
                                {
                                    route2.children?.map((route3, index) => ( /* Người viết: két zi bờ lu: Route3 là các  trang bậc 2 */
                                        <Route key = {route3.path ?? index} index = {route3.index} path = {route3.path} element = {route3.element}>
                                            
                                        </Route>
                                    ))
                                }
                            </Route>
                        ))}
                    </Route>
                ))}
            </Route>
        </Routes>
    );
}

export default Router;