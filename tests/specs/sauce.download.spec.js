/**
 * Basics are used form https://github.com/klamping/wdio-downloads
 * Credits to Kevin Lamping
 */

const { pathExistsSync, readFileSync } = require('fs-extra');
const { join } = require('path');
const { URL } = require('url');

describe('Downloads', () => {
  it('should download the file', () => {
    // Go to the correct page for testing the download functionality
    browser.url('./download');

    // Store the element reference for repeated use
    const downloadLink = $('*=some-file.txt');

    // Click the link to initiate the download.
    // Because the options / profiles have been set correctly no dialog is shown
    downloadLink.click();

    // Get the value of the 'href' attibute on the download link
    const downloadHref = downloadLink.getAttribute('href');

    // Pass through Node's `URL` class
    // @see https://nodejs.org/dist/latest-v8.x/docs/api/url.html
    const downloadUrl = new URL(downloadHref);

    // Get the 'pathname' off the url
    // e.g. 'download/some-file.txt'
    const fullPath = downloadUrl.pathname;

    // Split in to an array to only get the filename
    // e.g. ['download', 'some-file.txt']
    const splitPath = fullPath.split('/');

    // Get just the filename at the end of the array
    // e.g.  'some-file.txt'
    const fileName = splitPath.splice(-1)[ 0 ];

    /**
     * THIS IS EXTRA. BECAUSE WE HAVE A TEXT FILE WE CAN VERIFY TEXT
     * BY OPENING THE FILE IN THE BROWSER. BY DOING THAT WE KNOW 2 THINGS:
     *
     * 1. THE EXPECTED LOCATION WILL HOLD THE FILE
     * 2. THE FILE CAN BE OPENED AND THE EXPECTED CONTENT IS IN THERE
     */

    // Create the filename to the path where the downloads are stored
    const filePath = `${ browser.downloadFolder }${ fileName }`;


    browser.waitUntil(() => {
        browser.url(`file:///${filePath}`);
        return !$('body').getText().toLowerCase().includes('not found');
      },
      15000);

    // now for example check the content to verify if the download really succeeded
    expect($('body').getText()).toContain('asdf');
  });
});
