const { join } = require('path');

describe('Uploading files', () => {
  it('should be able to upload a file', () => {
    // The name of the file that needs to be uploaded
    const fileName = 'some-file.txt';

    // 1a.  Load the browser
    browser.url('/upload');

    // 3a.  Upload the file by adding the location to the file on the machine,
    $('#file-upload').setValue(join(process.cwd(),'assets', fileName));
    // 3b.  Submit the file upload
    $('#file-submit').click();

    // 4a.  Wait for the text to be visible, we are now validating it with the uploaded file container to be visible
    $('#uploaded-files').waitForVisible(15000);
    // 4b.  Do the verification
    expect($('#uploaded-files').getText()).toContain(fileName);
  });
});
