const prompt = require('prompt');
const { exec } = require('child_process');

prompt.start();

prompt.get(['commitMessage'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Commit message:', result.commitMessage);

  exec(
    `git commit -m "${result.commitMessage}" && npm version patch && npm run build && npm publish && git push`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
});

function onErr(err) {
  console.log(err);
  return 1;
}
