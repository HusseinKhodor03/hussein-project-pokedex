import "../styles/LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div>
      <h2 className="loader-title">Loading...</h2>
      <div className="loader"></div>
    </div>
  );
}

export default LoadingSpinner;
