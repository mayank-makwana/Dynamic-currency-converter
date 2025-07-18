import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner;
