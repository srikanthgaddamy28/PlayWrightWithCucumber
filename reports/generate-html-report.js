const reporter = require('cucumber-html-reporter');


const fs = require('fs');
const path = require('path');


// Collect all screenshot files
const screenshotsDir = path.join(__dirname, 'screenshots');
let screenshotsHtml = '';
if (fs.existsSync(screenshotsDir)) {
  const files = fs.readdirSync(screenshotsDir);
  screenshotsHtml = files.map(file => `<img src="screenshots/${file}" style="max-width:400px; margin:10px;" />`).join('');
}

// Collect all video files from test-results
const testResultsDir = path.join(__dirname, '../../test-results');
let videosHtml = '';
if (fs.existsSync(testResultsDir)) {
  const subdirs = fs.readdirSync(testResultsDir);
  let videoFiles = [];
  subdirs.forEach(subdir => {
    const subdirPath = path.join(testResultsDir, subdir);
    if (fs.statSync(subdirPath).isDirectory()) {
      const files = fs.readdirSync(subdirPath);
      files.forEach(file => {
        if (file.endsWith('.webm')) {
          videoFiles.push(`test-results/${subdir}/${file}`);
        }
      });
    }
  });
  videosHtml = videoFiles.map(file => `<video src="${file}" controls style="max-width:400px; margin:10px;"></video>`).join('');
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    'Screenshots': 'See below',
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
