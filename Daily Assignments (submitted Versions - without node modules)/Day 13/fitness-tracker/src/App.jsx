import WorkoutTracker from "./components/WorkoutTracker";
import ThemeToggle from "./components/ThemeToggle";
import OfflineBanner from "./components/OfflineBanner";
import ProductAdmin from "./pages/ProductAdmin";

function App() {
  return (
    <div className="container py-4">

      <OfflineBanner />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Fitness Tracker</h1>
        <ThemeToggle />
      </div>

      <div className="row">

        <div className="col-md-6">
          <WorkoutTracker />
        </div>

        <div className="col-md-6">
          <ProductAdmin />
        </div>

      </div>

    </div>
  );
}

export default App;