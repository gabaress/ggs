import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Route, Routes} from 'react-router-dom';
import Navbar from './components/nav';
import LandingPage from './components/landing';
import ViewCohorts from './components/cohorts';
import CohortIndividual from './components/cohortIndividual';
import NewCohort from './components/createCohort';
import ViewStudents from './components/students';
import StudentIndividual from './components/studentIndividual';
import NewStudent from './components/createStudent';
import EditGrade from './components/editStudent';
import ViewDegrees from './components/degrees';
import DegreeIndividual from './components/degreeIndividual';
import NewDegree from './components/createDegree';
import ViewModules from './components/modules';
import ModuleIndividual from './components/moduleIndividual';
import NewModule from './components/createModule';
import Footer from './components/footer';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
    <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/" element={LandingPage()} />
          <Route path="/degrees" element={ViewDegrees()} />
          <Route path="/cohorts" element={ViewCohorts()} />
          <Route path="/modules" element={ViewModules()} />
          <Route path="/students" element={ViewStudents()} />
          <Route path="/create-degree" element={NewDegree()} />
          <Route path="/create-cohort" element={NewCohort()} />
          <Route path="/create-module" element={NewModule()} />
          <Route path="/create-student" element={NewStudent()} />
          <Route path="/degrees/:id" element={<DegreeIndividual />} />
          <Route path="/cohorts/:id" element={<CohortIndividual />} />
          <Route path="/students/:id" element={<StudentIndividual />} />
          <Route path="/modules/:id" element={<ModuleIndividual />} />
          <Route path="/students/:id/edit" element={<EditGrade />} />
        </Routes>
      <Footer />
    </ThemeProvider>
    </Box>
  );
};

export default App;
