// Cegah Klik Kanan
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Cegah Ctrl+S dan Ctrl+U
  document.addEventListener('keydown', function(e) {
    // Cegah Ctrl+S
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
    }
    
    // Cegah Ctrl+U (view source)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
      e.preventDefault();
    }

    // Cegah F12
    if (e.key === 'F12') {
      e.preventDefault();
    }

    // Cegah Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
    }

    // Cegah Ctrl+Shift+C (inspect)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
    }

    // Cegah Ctrl+Shift+J (console)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
      e.preventDefault();
    }
  });