Instructions for when you want to replace the 'Beta' download with a newer version

### Steps ###

  * Make a copy of the local (up-to-date) folder that houses the GetSimple development version on your computer.
  * Download and run [NoSVN.exe](http://code.google.com/p/get-simple-cms/downloads/list) on that folder. This executable gets rid of  all the SVN specific files that do not need to be included in the download.
  * Zip up that folder with the name format: **`GetSimple_X.XB_rXXX.zip`**
  * Upload this new zip file to the [downloads](http://code.google.com/p/get-simple-cms/downloads/list) section of our Google Code project using the same naming convention: **`GetSimple X.X Beta - rXXX`**. Give this new download two new labels: 'Beta' & 'Featured'
  * We now need to get rid of the old beta download. Go to that particular file and click 'Delete download'. It will ask you to confirm your deletion, but instead of deleting just mark it as 'depreciated'.
  * Edit the get-simple.info `.htaccess` file to point /beta to the new file and also edit `/download/` to show the correct details on the beta download (size & rev #)