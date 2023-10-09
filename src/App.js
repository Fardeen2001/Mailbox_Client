import Header from "./components/layout/header/Header";
import classes from "./App.module.css";
import SideBar from "./components/layout/Sidebar/SideBar";

function App() {
  return (
    <>
      <Header />
      <div className={classes.body}>
        <SideBar />
      </div>
    </>
  );
}

export default App;
