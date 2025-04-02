import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../home/HomePage";
import PositionsDashboard from "../../features/positions/dashboard/PositionsDashboard";
import PositionForm from "../../features/positions/form/PositionForm";
import PositionDetailPage from "../../features/positions/details/PositionDetailPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'positions', element: <PositionsDashboard /> },
            { path: 'positions/:id', element: <PositionDetailPage /> },
            { path: 'createPosition', element: <PositionForm key='create' /> },
            { path: 'edit/:id', element: <PositionForm /> }
        ]
    }
])