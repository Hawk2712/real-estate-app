import React, { createContext, useContext, useEffect } from "react";
import Swal from "sweetalert2";

export const AlertContext = createContext(null);

export const AlertContextProvider = ({ children }) => {
  useEffect(() => {
    // Ensure the SweetAlert2 container exists and set its z-index
    const initializeSweetAlert2Container = () => {
      const container = Swal.getContainer();
      if (container) {
        container.style.zIndex = "99999";
      } else {
        // If container doesn't exist yet, try again after a short delay
        setTimeout(initializeSweetAlert2Container, 100);
      }
    };

    initializeSweetAlert2Container();
  }, []);

  const toast = (title, icon, position = "top-end") => {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        container: "swal2-toast-container",
      },
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
        // Set high z-index for toast container
        const toastContainer = document.querySelector(".swal2-toast-container");
        if (toastContainer) {
          toastContainer.style.zIndex = "99999";
        }
      },
    });

    return Toast.fire({
      icon: icon,
      title: title,
    });
  };

  const showSuccessToast = (message) => toast(message, "success");
  const showErrorToast = (message) => toast(message, "error");
  const showWarningToast = (message) => toast(message, "warning");
  const showInfoToast = (message) => toast(message, "info");

  const showConfirmAlert = (
    title,
    text,
    confirmButtonText = "Yes",
    cancelButtonText = "No"
  ) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });
  };

  const showSuccessAlert = (title, text) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showErrorAlert = (title, text) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const value = {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showConfirmAlert,
    showSuccessAlert,
    showErrorAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export default AlertContextProvider;
