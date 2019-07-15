// You left your computer unlocked and your friend decided to troll you by copying a lot of your files to random spots all over your file system.

// Even worse, she saved the duplicate files with random, embarrassing names ("this_is_like_a_digital_wedgie.txt" was clever, I'll give her that).

// Write a function that returns an array of all the duplicate files. We'll check them by hand before actually deleting them, since programmatically deleting files is really scary. To help us confirm that two files are actually duplicates, return an array of arrays ↴ where:

// the first item is the duplicate file
// the second item is the original file
// For example:

//   [['/tmp/parker_is_dumb.mpg', '/home/parker/secret_puppy_dance.mpg'],
//  ['/home/trololol.mov', '/etc/apache2/httpd.conf']]
// You can assume each file was only duplicated once.


const fs = require('fs');
const crypto = require('crypto');

function findDuplicateFiles(startingDirectory) {
  const filesSeenAlready = {};
  const stack = [startingDirectory];

  const duplicates = [];

  while (stack.length) {

    const currentPath = stack.pop();
    const currentFile = fs.statSync(currentPath);

    // If it's a directory,
    // put the contents in our stack
    if (currentFile.isDirectory()) {
      fs.readdirSync(currentPath).forEach(path => {
        stack.push(`${currentPath}/${path}`);
      });

      // If it's a file
    } else {

      // Get its hash
      const fileHash = sampleHashFile(currentPath);

      // Get its last edited time
      const currentLastEditedTime = currentFile.mtime;

      // If we've seen it before
      if (filesSeenAlready.hasOwnProperty(fileHash)) {

        const existingFile = filesSeenAlready[fileHash];

        if (currentLastEditedTime > existingFile.lastEditedTime) {

          // Current file is the dupe!
          duplicates.push([currentPath, existingFile.path]);

        } else {

          // Old file is the dupe!
          duplicates.push([existingFile.path, currentPath]);

          // But also update the object to have the new file's info
          filesSeenAlready[fileHash] = { lastEditedTime: currentLastEditedTime, path: currentPath };
        }

        // If it's a new file, throw it in filesSeenAlready
        // and record its path and last edited time,
        // so we can tell later if it's a dupe
      } else {
        filesSeenAlready[fileHash] = { lastEditedTime: currentLastEditedTime, path: currentPath };
      }
    }
  }

  return duplicates;
}

function sampleHashFile(path) {
  const file = fs.statSync(path);

  const sampleSize = 4000;
  const totalBytes = file.size;

  const hash = crypto.createHash('sha512');

  // If the file is too short to take 3 samples, hash the entire file
  if (totalBytes < sampleSize * 3) {
    hash.update(fs.readFileSync(path));

  } else {
    const numBytesBetweenSamples = (totalBytes - sampleSize * 3) / 2;

    const buffer = Buffer.alloc(sampleSize * 3);

    // Read first, middle, and last bytes
    for (let offsetMultiplier = 0; offsetMultiplier <= 2; offsetMultiplier++) {
      const fd = fs.openSync(path, 'r');

      const offset = offsetMultiplier * sampleSize;
      const position = offsetMultiplier * (sampleSize + numBytesBetweenSamples);

      fs.readSync(fd, buffer, offset, sampleSize, position);
    }

    hash.update(buffer);
  }

  return hash.digest();
}