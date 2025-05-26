setInterval(() => {
  if (timeElapsed > 1000) {
      document.getElementById('secretResult').textContent = "secret: {{level_session.finish_secret}}";
      return;
    } else if (timeElapsed > 0) {
      document.getElementById('secretResult').textContent = "Failed to fetch secret in time.";
    }
}
, 50);
