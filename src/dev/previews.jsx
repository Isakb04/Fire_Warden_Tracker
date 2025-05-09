import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import HomePage from "../App";
import ManageWardenForm from "../App";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";
import TopBar from "../components/TopBar";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/ManageWardenForm">
                <AddWardenForm/>
            </ComponentPreview>
            <ComponentPreview path="/LoginPage">
                <LoginPage/>
            </ComponentPreview>
            <ComponentPreview path="/DashboardPage">
                <DashboardPage/>
            </ComponentPreview>
            <ComponentPreview path="/AdminPage">
                <AdminPage/>
            </ComponentPreview>
            <ComponentPreview path="/TopBar">
                <TopBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews