import React, { useEffect } from "react";
import Swal from "sweetalert2";

const CustomAlert = ({ alert, setAlert }) => {
  useEffect(() => {
    if (alert) {
      Swal.fire({
        icon: alert.type,
        title: alert.title,
        text: alert.text,
        showCancelButton: alert.showCancel || false,
        confirmButtonText: alert.confirmButtonText || "OK",
      }).then((result) => {
        if (result.isConfirmed && alert.onConfirm) {
          alert.onConfirm();
        }
        setAlert(null); // Clear the alert after displaying it
      });
    }
  }, [alert, setAlert]);

  return null; // This component doesn't render anything
};

export default CustomAlert;
