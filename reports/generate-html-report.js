const reporter = require('cucumber-html-reporter');


const fs = require('fs');
const path = require('path');



// Collect all screenshot files grouped by scenario
const screenshotsDir = path.join(__dirname, 'screenshots');
let screenshotsHtml = '';
if (fs.existsSync(screenshotsDir)) {
  const scenarioFolders = fs.readdirSync(screenshotsDir).filter(f => fs.statSync(path.join(screenshotsDir, f)).isDirectory());
  screenshotsHtml = scenarioFolders.map(folder => {
    const files = fs.readdirSync(path.join(screenshotsDir, folder)).filter(file => file.endsWith('.png'));
    const imgs = files.map(file => `<img src="screenshots/${folder}/${file}" style="max-width:400px; margin:10px;" />`).join('');
    return `<div><b>${folder.replace(/_/g, ' ')}</b><br>${imgs}</div>`;
  }).join('<hr>');
}


// Collect all video files from reports/videos
const videosDir = path.join(__dirname, 'videos');
let videosHtml = '';
if (fs.existsSync(videosDir)) {
  const files = fs.readdirSync(videosDir);
  videosHtml = files
    .filter(file => file.endsWith('.webm'))
    .map(file => `<video src="videos/${file}" controls style="max-width:400px; margin:10px;"></video>`)
    .join('');
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    'Screenshots': screenshotsHtml,
    'Videos': videosHtml
  },
  customData: {
    title: 'Artifacts',
    data: [
      { label: 'Screenshots', value: screenshotsHtml },
      { label: 'Videos', value: videosHtml }
    ]
  }
};

reporter.generate(options);
