import { project } from "./project";
import { homePage } from "./home"
import { projectPage } from "../project-page";
const projectList = new Array();
projectList.push(new project(123, 23));
projectList.push(new project(124, 24));
projectList.push(new project(125, 25));
projectList.push(new project(126, 26));
homePage.display(projectList);
projectPage.display(projectList[1]);