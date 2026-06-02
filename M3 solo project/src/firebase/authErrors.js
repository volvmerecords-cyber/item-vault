export function getAuthErrorMessage(error) {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled for this Firebase project.";
    case "auth/popup-blocked":
      return "The Google sign-in popup was blocked. Please allow popups and try again.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled before it finished.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase authentication.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
}
