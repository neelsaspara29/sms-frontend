import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { authData, data } from "./routeData";

function MainRoute() {
  const { token } = useSelector((state) => state.adminAuth);
  return (
    <>
      {!token ? (
        <>
          {" "}
          <Routes>
            {authData?.map((route) => (
              <Route path={`/${route.routeName}`} element={route.component} />
            ))}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          {data?.map((route) => (
            <Route path={`/${route.routeName}`} element={route.component} />
          ))}
          <Route path="*" element={<Navigate to="/student" />} />
        </Routes>
      )}
    </>
  );
}

export default MainRoute;
