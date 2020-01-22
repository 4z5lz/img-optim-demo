const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;

if (connection) {
  let speedType = 'fast';
  if (/\slow-2g|2g|3g/.test(connection.effectiveType)) {
    speedType = 'slow';
  }

  document.getElementById('network').innerHTML = 
    `<strong>Network speed type:</strong> ${speedType}<br>
    <strong>Network type:</strong> ${connection.effectiveType}`
}

const performanceData = [];
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.map(res => {
      if (res.initiatorType === 'img') {
        performanceData.push({
          name: res.name,
          startTime: res.startTime,
          responseEnd: res.responseEnd,
          duration: res.duration,
          rawData: res
        });
      }
    });
  });
  observer.observe({ entryTypes: ['resource'] });
}

window.onload = () => {
  performanceData.forEach(d => {
    console.log('d', d);
  });

  // Calculate avg. load duration
  let avgLoadDuration = (performanceData.reduce((r, c) => r + c.duration, 0) / performanceData.length / 1000).toFixed(
    3
  );

  // Calculate total images loading time
  let responseEnd = performanceData.reduce((r, c) => Math.max(r, c.responseEnd), 0).toFixed(3);

  document.getElementById('performance').innerHTML = 
    `<strong>Total ${performanceData.length} images loaded</strong><br>
    <strong>Avg. load duration:</strong> ${avgLoadDuration} sec<br>
    <strong>All images loaded within:</strong> ${responseEnd} sec.`;
};
