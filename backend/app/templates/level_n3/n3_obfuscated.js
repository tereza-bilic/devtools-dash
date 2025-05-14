// Money Network Challenge - Level N3
// Obfuscated version 
fetch("{{ url_path_for('get_n3_response') }}")
  .then(response => response.json())
  .then(data => {
    // Update progress
    document.getElementById('money-amount').textContent = data.money;
    const percentage = Math.min(100, Math.round((data.money / 1000) * 100));
    
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
    
    // Show secret if enough money
    if (percentage >= 100) {
      document.getElementById('secret-reveal').style.display = 'block';
      document.getElementById('secret-code').innerHTML = "{{ level_session.finish_secret }}";
    }
  })
  .catch(error => console.error('Error:', error));