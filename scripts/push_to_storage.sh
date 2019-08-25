#!/bin/bash
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY -X POST -H "Content-Type: application/octet-stream" https://saucelabs.com/rest/v1/storage/$SAUCE_USERNAME/mac_download.sh?overwrite=true --data-binary @scripts/mac_download.sh
curl -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY -X POST -H "Content-Type: application/octet-stream" https://saucelabs.com/rest/v1/storage/$SAUCE_USERNAME/windows_download.bat?overwrite=true --data-binary @scripts/windows_download.bat
