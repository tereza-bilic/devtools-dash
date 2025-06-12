timeElapsed = 0;
document.getElementById('fetchSecretBtn').onclick = async function() {
      const startTime = Date.now();
      document.getElementById('secretResult').textContent = "Loading...";
      const res = await fetch("{{ url_path_for('get_n4_secret') }}")
      timeElapsed = Date.now() - startTime;
    }
