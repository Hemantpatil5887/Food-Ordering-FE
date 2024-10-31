import React, { useEffect, useState } from 'react';
import './Snackbar.scss';

function Snackbar({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Set a timer to automatically close the snackbar after the specified duration
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    // Clear the timer if the component unmounts or the timer completes
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="snackbar">
      {message}
      <button className="close-button" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

export default Snackbar;
