export function openInNewTab({ e, url }) {
  // Prevent default behavior to avoid page navigation
  e.preventDefault();

  // Open the image URL in a new tab
  window.open(url, "_blank");
}
