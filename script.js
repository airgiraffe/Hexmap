document.addEventListener('DOMContentLoaded', () => {
  let fillColor = 'red';
  let clearMode = false; // Variable to track clear mode
  const hexes = document.getElementById('Hexes');
  const homes = document.getElementById('Homes');
  const toggleClearButton = document.getElementById('toggleClear');

  // Load saved state from localStorage
  loadState();

  // Toggle clear mode on button click
  toggleClearButton.addEventListener('click', () => {
    clearMode = !clearMode;
    toggleClearButton.textContent = clearMode ? 'Clear Mode On' : 'Clear Mode Off';
    toggleClearButton.classList.toggle('toggled', clearMode); // Toggle the class
  });

  // Add event listeners to each polygon element in the "Hexes" group
  Array.from(hexes.querySelectorAll('polygon')).forEach(polygon => {
    polygon.addEventListener('click', () => {
      if (clearMode) {
        polygon.removeAttribute('class'); // Clear all classes
        polygon.setAttribute('class', "st0");
      } else {
        polygon.setAttribute('class', fillColor);
      }
      saveState(); // Save the state after each change
    });
  });

  // Add event listeners to each polygon element in the "Homes" group
  Array.from(homes.querySelectorAll('polygon')).forEach(polygon => {
    polygon.addEventListener('click', () => {
      fillColor = polygon.getAttribute('class');
    });
  });

  // Function to save the state to localStorage
  function saveState() {
    const hexStates = Array.from(hexes.querySelectorAll('polygon')).map(polygon => ({
      id: polygon.id,
      class: polygon.getAttribute('class')
    }));
    localStorage.setItem('hexStates', JSON.stringify(hexStates));
  }

  // Function to load the state from localStorage
  function loadState() {
    const hexStates = JSON.parse(localStorage.getItem('hexStates'));
    if (hexStates) {
      hexStates.forEach(state => {
        const polygon = document.getElementById(state.id);
        if (polygon) {
          polygon.setAttribute('class', state.class);
        }
      });
    }
  }
});
